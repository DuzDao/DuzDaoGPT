import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('userId');
    if (userId === null) {
      return NextResponse.json({ error: 'Unauthorized userId not found' }, { status: 401 });
    }

    const conversations = await prisma.conversations.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({ conversations }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("userId");

    if (userId === null) {
      return NextResponse.json({ error: 'Unauthorized userId not found' }, { status: 401 });
    }

    // Title
    const { title } = await req.json();

    // Create new conversation
    const newConversation = await prisma.conversations.create({
      data: {
        userId: userId,
        title: title || `New conversation on ${Date.now()}`,
      }
    })
    
    return NextResponse.json({conversation: newConversation}, {status: 201})

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Something went wrong"}, {status: 500});
  }
}