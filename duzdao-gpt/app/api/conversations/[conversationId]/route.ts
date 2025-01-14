import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
        createdAt: 'desc',
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
    const { role, content } = await req.json();
    const conversationId = (await params).conversationId;

    // append new message
    const newMessage = await prisma.messages.create({
      data: {
        conversationId: conversationId,
        role: role,
        content: content
      }
    })
    
    return NextResponse.json({newMessage}, {status: 201})

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: error}, {status: 500})
  }
}
