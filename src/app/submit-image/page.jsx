import React from 'react'
import ImageForm from '../(components)/imageform'

const getCategories = async () => {
  try {
    const res =  await fetch("http://localhost:3000/api/getcategories", {
      cache : "no-store"
    })
    return res.json();
  } catch (error) {
    console.log(error)
  }
}



const SubmitImage = async () => {
  const categories = await getCategories()
  console.log(categories, "CATTTTTTTTTTTT")
  return (
    <div className="max-w-5xl min-h-screen mx-auto">
      <ImageForm categories={categories}/>
    </div>
  )
}

export default SubmitImage