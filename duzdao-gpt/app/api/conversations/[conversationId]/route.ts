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
    

    // Get all messages of conversation
    const context = await prisma.messages.findMany({
      where: {conversationId:conversationId}
    })

    const messages: { role: "user" | "system"; content: string}[] = context.map((message) => ({
      role: message.role === "user" ? "user" : "system",
      content: message.content,
    }));

    // send messages to openai api
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [
        ...messages,
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

export async function DELETE(req: NextRequest, {params}: Params) {
  try {
    await prisma.conversations.delete({
      where: {
        id: 'cm66adh2n0001hdr8oadsylwd'
      }
    })

    return NextResponse.json({message: "Conversation deleted"}, {status: 200})
  } catch (error: any) {
    console.log(error.stack);
    return NextResponse.json({error: "Internal server error"}, {status: 500})
  }
}
