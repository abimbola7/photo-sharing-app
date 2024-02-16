import { NextResponse } from "next/server";
import { Post } from "@/app/(models)/user";

export async function GET(request) {
  console.log(request)
  try {
    const latest  = await Post.find().sort({createdAt: -1})
    // .limit(5)
    return NextResponse.json({ latest }, { status : 200 })
  } catch(error){
    return NextResponse.json({ message : error }, { status : 500 })
  }
}

export const revalidate = 10;