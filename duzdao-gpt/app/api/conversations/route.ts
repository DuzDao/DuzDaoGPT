import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const userId = req.headers.get("userid");

  try {
    if (userId === null) {
      return NextResponse.json({ error: 'Unauthorized userId not found' }, { status: 401 });
    }

    const conversations = await prisma.conversations.findMany({
      where: { 
        userId: userId,
      },
      orderBy: {
        updatedAt: "desc"
      }
    });

    return NextResponse.json({ conversations }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
  }
}

export async function POST(req: NextRequest) {
  console.log(req);
  try {
    const userId = req.headers.get("userId");

    if (userId === null) {
      return NextResponse.json({ error: 'Unauthorized userId not found' }, { status: 401 });
    }

    // Title
    const title = await req.headers.get("title");

    // Create new conversation
    const newConversation = await prisma.conversations.create({
      data: {
        userId: userId,
        title: title || `New conversation on ${dayjs(new Date()).format("DD/MM/YYYY")}`,
      }
    })
    
    return NextResponse.json({conversation: newConversation}, {status: 201})

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Something went wrong"}, {status: 500});
  }
}