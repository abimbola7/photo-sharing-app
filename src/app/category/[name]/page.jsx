

import CatHeader from '@/app/(components)/catheader'
import Post from '@/app/(components)/post'
import Image from 'next/image'
import React from 'react'

async function getCat(name) {
  try {
    const res =  await fetch(`https://photo-sharing-app-iu6c.vercel.app/api/category?category=${name}`, {
      cache : "no-store"
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function getPosts(name) {
  try {
    const res =  await fetch(`https://photo-sharing-app-iu6c.vercel.app/api/getposts?category=${name}`, {
      cache : "no-store"
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}



const Cat = async ({ params }) => {
  const { cat } = await getCat(params.name)
  const posts  = await getPosts(params.name)
  // console.log(posts)
  // console.log(/category)
  return (
    <div>
      <CatHeader category={cat}/>
      <div className='max-w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 py-10  gap-4'>
        {
          posts.cat && posts.cat.map((post)=>(
            <Post 
            key={post._id} 
            title={post.title} 
            name={post.author.username}
            avatar={post.author.avatar}
            createdAt={post.createdAt} 
            image={post.image}/>
          ))
        }
      </div>
    </div>
  )
}

export default Cat