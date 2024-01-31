
import { NextResponse } from "next/server";
import { Post } from "@/app/(models)/user";

export async function GET(req, { params }) {
  console.log(params, "ieibgibeiubgiugiobeiugioebgoiengoegboenb")
  const { id } = params;
  // console.log(id, "params")
  try {
    const post =  await Post.findOne({ title : id })
    console.log(post, "POSTSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
    return NextResponse.json({ post }, { status : 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse.json({ message : error }, { status : "500" })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Post.deleteOne({ _id: id })
    return NextResponse.json({ message : "Ticket Deleted" }, { status : 200 })
  } catch (error) {
    return NextResponse({ message : error }, { status : "500" })
  }
}