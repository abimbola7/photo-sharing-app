import { User, Post } from "@/app/(models)/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const avatar =  await User.findOne({ username : id }, {avatar : 1})
    return NextResponse.json({ avatar }, { status : 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse.json({ message : error }, { status : "500" })
  }
}


export async function PUT(req, { params }) {
  try {
    console.log(params, "params")
    const { id } = params;
    // console.log(id, "USERIIDDDD")
    const body = await req.json()
    console.log(body.image)
    await User.updateOne({ _id : id }, { $set: { avatar: body.image } })
    await Post.updateMany({ 'author.username': body.username }, { $set: { 'author.avatar': body.image } })
    return NextResponse.json({ message : "Ticket Updated" }, { status : 200 })
  } catch (error) {
    console.log(error, "PLEASE SHOW THE ERROR")
    return NextResponse.json({ message : error }, { status : "500" })
  }
}