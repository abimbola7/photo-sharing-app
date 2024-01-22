import { NextResponse } from "next/server";
import { Post } from "@/app/(models)/user";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body.post)
    await Post.create(body.post)
    return NextResponse.json({ message : "posts" }, { status : 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message : "posts" }, { status : 500 })
  } 
}