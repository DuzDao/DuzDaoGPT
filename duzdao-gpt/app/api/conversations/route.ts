import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

interface jwtPayload {
  userId: string;
}

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Get token from authorization
    const authorizationHeader = req.headers.get('Authorization');
    if (!authorizationHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authorizationHeader.split(' ')[1]; // Bearer <token>

    // Verify token
    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtPayload;
      userId = decoded.userId;
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
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
    // Get token
    const authorizationHeader = req.headers.get('Authorization');
    if (!authorizationHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authorizationHeader.split(' ')[1];
    
    // Verify token
    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtPayload;
      userId = decoded.userId;
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
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