import { NextResponse } from "next/server";
import { Post } from "@/app/(models)/user";

export async function GET(req, { params }){
  const { id } = params;
  try {
    const likesCount = await Post.aggregate([
      // Stage 1: Match posts by user ID
      { $match: { "author.username": id } },
      // Stage 2: Unwind the "likes" array
      { $unwind: "$likes" },
      // Stage 3: Count the number of documents (likes)
      { $count: "totalLikes" }
    ])

    console.log(likesCount, "LIKESCOUNTTTTTT")
    return NextResponse.json({ likesCount }, { status : 200 })
  } catch(error) {
    return NextResponse.json({ message : error }, { status : 500 })
  }
}