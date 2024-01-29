
import { NextResponse } from "next/server";
import { User } from "@/app/(models)/user";

export async function GET(req, { params }) {
  console.log(params, "ieibgibeiubgiugiobeiugioebgoiengoegboenb")
  const { name } = params;
  // console.log(id, "params")
  try {
    const post =  await User.findOne({ username : name }, { username : 1, email : 1, avatar : 1, bio: 1 })
    return NextResponse.json({ post }, { status : 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse.json({ message : error }, { status : "500" })
  }

}

export async function PUT(req, { params }) {
  try {
    console.log(params, "params")
    const { name } = params;
    // console.log(id, "USERIIDDDD")
    const body = await req.json()
    console.log(body.bio)
    await User.updateOne({ _id : name }, { $set: { bio: body.bio } })
    return NextResponse.json({ message : "Ticket Updated" }, { status : 200 })
  } catch (error) {
    console.log(error, "PLEASE SHOW THE ERROR")
    return NextResponse.json({ message : error }, { status : "500" })
  }
}
