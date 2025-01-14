import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const {email, password} = await req.json();
    if (!email || !password) {
      return NextResponse.json({error: "Missing info"}, {status: 400});
    }

    const user = await prisma.users.findUnique({
      where: {email: email}
    })

    // user not found
    if (!user) {
      return NextResponse.json({error: "User not found"}, {status:401});
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({error: "Wrong password"}, {status: 401});
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET!, {expiresIn: '1h'} );

    return NextResponse.json({token}, {status:200})

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
  }
}

