

import { NextResponse } from "next/server";
import { Post } from "@/app/(models)/user";

export async function GET(req, { params }){
  const { id } = params;
  const likes = await Post.findOne({ _id : id }, { likes : 1 })
  // console.log(likes, "LIKESSSSSS")
  // console.log(id, "IDDDDDDD")
  return NextResponse.json({ likes }, { status : 200 })
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json()
    console.log(body.comments)
    await Post.updateOne({ _id : id }, { $push: { comments: body.comments } })
    return NextResponse.json({ message : "Ticket Updated" }, { status : 200 })
  } catch (error) {
    return NextResponse({ message : error }, { status : "500" })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const body  = await req.json()
    await Post.updateOne({ _id : id }, { $pull: { likes: body.username } });
    return NextResponse.json({ message : "Ticket Deleted" }, { status : 200 })
  } catch (error) {
    return NextResponse({ message : error }, { status : "500" })
  }
}