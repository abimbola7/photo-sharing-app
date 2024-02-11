import { Post } from "@/app/(models)/user";
import { NextResponse } from "next/server";



export async function GET(req, { params }){
  console.log(params.id)
  const { id } = params;
  const comments = await Post.findOne({ _id : id }, { comments : 1  }).sort({createdAt: -1})
  console.log(comments, "COMMENTS")
  return NextResponse.json({ comments }, { status : 200 })
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json()
    console.log(typeof body.createdAt, "body of comment")
    // const ticketData = body.
    await Post.updateOne({ _id : id }, { $push: { comments : body } })
    return NextResponse.json({ message : "Ticket Updated" }, { status : 200 })
  } catch (error) {
    console.log(error, "PLEASE SHOW THE ERROR")
    return NextResponse.json({ message : error }, { status : "500" })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const body  = await req.json()
    await Post.updateOne({ _id : body.id }, { $pull: { comments: {_id : id} } });
    return NextResponse.json({ message : "Ticket Deleted" }, { status : 200 })
  } catch (error) {
    return NextResponse({ message : error }, { status : "500" })
  }
}