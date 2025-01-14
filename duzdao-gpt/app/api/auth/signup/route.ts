import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json({error: "Missing info"}, {status:400});
    }

    const existingUser = await prisma.users.findUnique({
      where: {email: email}
    })
    
    // Check email
    if (existingUser) {
      return NextResponse.json({error: "Email already exists"}, {status:400});
    }
    
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // create new user
    const newUser = await prisma.users.create({
      data: {
        name, email, password: hashedPassword
      }
    })

    return NextResponse.json({user: newUser}, {status:201})

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Something went wrong"}, {status: 500});
  }
}


