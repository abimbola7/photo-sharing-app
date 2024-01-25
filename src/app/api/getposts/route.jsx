// gender: { $in: ["man"
import { NextResponse } from "next/server";
import { Post } from "@/app/(models)/user";

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  try {
      const cat = await Post.find({category: `${category}`})
      // console.log(cat, "CATTTTT")
      return NextResponse.json({ cat }, { status : 200 });
  }catch(error) {
    console.log(error)
    return NextResponse.json({ message : error, error }, { status : 500 })
  }
}