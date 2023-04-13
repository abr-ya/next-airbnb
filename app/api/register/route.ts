import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const { email, name, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = {
    data: {
      email,
      name,
      hashedPassword,
    },
  };
  console.log("create user:", newUser);
  // const user = await prisma.user.create(newUser);

  return NextResponse.json(newUser); // todo: user
}
