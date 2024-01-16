import { NextResponse } from "next/server";
import User from "@/app/(models)/user";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const userData  = body.user
    console.log(userData)
    const user = await User.findOne({ $or : [{email : userData.email}, { username : userData.username }]})
    if (user) {
      let errors = {}
      if (user.email === userData.email) {
        errors.email = `${user.email} already exists`
      } else {
        errors.username = `${user.username} already exists`
      }
      return NextResponse.json({ errors }, { status : 400 })
    } else {
      return NextResponse.json({ message : "User does not exist" }, { status : 200 })
    }
  } catch (error) {
    return NextResponse.json({ message : error }, { status : 500 })  
  }
} 