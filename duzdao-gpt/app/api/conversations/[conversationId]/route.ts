import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";


interface Params {
  params: {
    conversationId: string;
  }
}

interface jwtPayload {
  userId: string
}

export async function GET(req: NextRequest, {params}: Params) {
  try {
    const conversationId = (await params).conversationId;
    
    // get token
    const authorization = req.headers.get("Authorization")
    if (!authorization) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    const token = authorization.split(" ")[1];
    
    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtPayload;
      userId = decoded.userId;
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // check valid userId & conversationId
    const conversation = await prisma.conversations.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!conversation || conversation.userId !== userId) {
      return NextResponse.json(
        { error: 'Conversation not belong to you' },
        { status: 404 }
      );
    }

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
