import { NextResponse } from "next/server";
import { Post } from "@/app/(models)/user";

export async function GET(req, { params }){ 
  console.log(params, "params")
  const { id } = params;
  try {
    const results = await Post.find({
      $or: [
        { title: { $regex: new RegExp(id, 'i') } }, // 'i' for case-insensitive
        { "author.username": { $regex: new RegExp(id, 'i') } },
        { tags: { $in: [new RegExp(id, 'i')] } }, // $in for array matching
        { category: { $in: [new RegExp(id, 'i')] } },
      ],
    });

    console.log(results, "RESULTS")
    return NextResponse.json({ results }, { status : 200 })
  }catch (error){
    return NextResponse.json({ message : error }, { status : 500 })
  }
}