import { User } from "@/app/(models)/user";
import { NextResponse } from "next/server";
// import User from "@/app/(models)/user";

export async function POST(req, res) {
  try {
    const body = await req.json();
    console.log(body)
    await User.create(body)
    return NextResponse.json({ message : "Registration Successful" }, { status : 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message : "Registration failed" }, { status : 500 })
  }
}