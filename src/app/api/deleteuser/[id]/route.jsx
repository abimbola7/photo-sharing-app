import { NextResponse } from "next/server"
import { Post, User } from "@/app/(models)/user"


export async function DELETE(req, { params }) {
  const username  = params.id
  await User.deleteOne({username: username});
  await Post.deleteMany({"author.username": username});
  await Post.updateMany({ 'comments.username': username }, { $pull: { comments: { username: username } } })
  return NextResponse.json({ message : "delete user" }, { status : 200 })
}