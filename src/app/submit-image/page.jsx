import React from 'react'
import ImageForm from '../(components)/imageform'
import { getServerSession } from 'next-auth'
import { handler } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const getCategories = async () => {
  try {
    const res =  await fetch("https://art-nook.vercel.app/api/getcategories", {
      cache : "no-store"
    })
    return res.json();
  } catch (error) {
    console.log(error)
  }
}



const SubmitImage = async () => {
  const session = await getServerSession(handler)
  if (!session) redirect("/");
  const categories = await getCategories()
  console.log(categories, "CATTTTTTTTTTTT")
  return (
    <div className="max-w-5xl min-h-screen mx-auto">
      <ImageForm categories={categories}/>
    </div>
  )
}

export default SubmitImage