import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import OpenAI from 'openai';


const prisma = new PrismaClient();
const openai = new OpenAI({apiKey: process.env["OPENAI_API_KEY"]});

interface Params {
  params: {
    conversationId: string;
  }
}

export async function GET(req: NextRequest, {params}: Params) {
  try {
    const conversationId = (await params).conversationId;
    
    // get all messages
    const messages = await prisma.messages.findMany({
      where: {
        conversationId: conversationId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({ messages }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: error}, {status: 500})
  }
}

export async function POST(req: NextRequest, {params}: Params) {
  try {
    const { content } = await req.json();
    const conversationId = (await params).conversationId;

    // append new message
    const newMessage = await prisma.messages.create({
      data: {
        conversationId: conversationId,
        role: "user",
        content: content
      }
    })
    
    // send message to openai api
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }, 
        { role: 'user', content: content },
      ],
    });

    const modelResponse = completion.choices[0].message?.content;
    if (!modelResponse) {
      return NextResponse.json({error: "OpenAI api key"}, {status:500})
    }

    //append new message from model to database
    const newModelMessage = await prisma.messages.create({
      data: {
        conversationId: conversationId,
        role: "model",
        content: modelResponse
      }
    })

    return NextResponse.json({newModelMessage}, {status: 201})

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: error}, {status: 500})
  }
}
