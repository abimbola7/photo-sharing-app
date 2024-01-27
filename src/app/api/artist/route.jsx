import { NextResponse } from "next/server";
import { Category, Post } from "@/app/(models)/user";

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const artist = searchParams.get('artist')
  // console.log(category)
  try {
      const cat = await Post.find({ "author.username" :artist })
      // console.log(cat, "CATTTTT")
      return NextResponse.json({ cat }, { status : 200 });
  }catch(error) {
    console.log(error)
    return NextResponse.json({ message : error, error }, { status : 500 })
  }
}