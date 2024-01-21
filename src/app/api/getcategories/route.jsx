import { NextResponse } from "next/server";
import Category from "@/app/(models)/categories";
import User from "@/app/(models)/user";

export async function GET(req) {
  try {
    const cat = await Category.find()
    console.log(cat, "CATTTTT")
    return NextResponse.json({ cat }, { status : 200 });
  } catch(error) {
    console.log(error)
    return NextResponse.json({ message : error, error }, { status : 500 })
  }
}