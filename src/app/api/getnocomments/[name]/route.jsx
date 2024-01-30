import { NextResponse } from "next/server";
import { Post } from "@/app/(models)/user";

export async function GET(req, { params }){
  console.log(params, "params.nameoieindgonengienog")
  const { name } = params;
  try {
    const commentCount = await Post.aggregate([
      // Stage 1: Match posts with comments (assuming there will be at least one comment in each post)
      { $match: { "comments": { $exists: true } } },
      // Stage 2: Unwind the "comments" array
      { $unwind: "$comments" },
      // Stage 3: Filter comments by username of the main user
      { $match: { "comments.username": name} },

      { $count: "totalComments" }
    ])

    console.log(commentCount, "LIKESCOUNTTTTTT")
    return NextResponse.json({ commentCount }, { status : 200 })
  } catch(error) {
    return NextResponse.json({ message : error }, { status : 500 })
  }
}