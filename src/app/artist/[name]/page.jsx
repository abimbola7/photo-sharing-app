

import Post from '@/app/(components)/post'
import UserBio from '@/app/(components)/userbio'
import { Post as PP } from '@/app/(models)/user'
import Link from 'next/link'
import React from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'




const getRelatedPost = async (name) => {
  // console.log(name, "name")
  try {
    const post = await PP.find({ "author.username" : name });
    return post
  } catch (error) {
    console.log(error)
  }
}

async function getCat(name) {
  try {
    const res =  await fetch(`https://photo-sharing-app-iu6c.vercel.app/api/artist?artist=${name}`, {
      cache : "no-store"
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}





const getArtist = async (name) => {
  // console.log(name, "name")
  const res = await fetch(`https://photo-sharing-app-iu6c.vercel.app/api/artist/${name}`, {
    cache: "no-store"
  })
  console.log(res.ok)
  if (!res.ok) {
    throw new Error("Failed to get Post")
  }
  return res.json();
}




const ArtistPage = async ({ params }) => {
  const { cat } = await getCat(params.name)
  // console.log(cat, "CATTTTT")
  const { post : artist } = await getArtist(params.name)
  const posts = await getRelatedPost(params.name)
  // console.log(posts, "POSTSSSS")
  return (
    <div className='w-full'>
      <div className="relative group">
        <img src="/images/main.jpg" alt="img" className='w-full h-96 object-cover object-center brightness-75'/>
        <UserBio name={artist.username} id={artist._id}/>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <img src={artist.avatar} alt={"img"} className="w-36 h-36 md:w-48 md:h-48 rounded-full p-[1.5px] border-[2px] border-red-500 object-cover transition-transform  duration-200 ease-out"/>
            <p className='text-lg md:text-2xl font-semibold text-center mt-2 flex items-center gap-1'>
              <span>{artist.username}</span>
              <IoIosCheckmarkCircle className='text-red-500'/>
            </p>
          </div>
          <div className="p-1 bg-card w-full flex flex-col items-center mt-2">
            <div className='flex flex-col items-center'>
              <p className="font-bold text-2xl text-center">{ posts.length}</p>
              <p className="font-semibold text-gray-400 !block uppercase">posts</p>
            </div>
          </div>
        </div>
      </div>
      {/* relatedposts */}
      <div className='max-w-[95%] mx-auto p-3'>
        <h1 className='text-center font-semibold uppercase text-2xl'>POSTS</h1>
      </div>

      <div className='max-w-[95%] grid grid-cols-1 sm:grid-cols-2 py-4 gap-4 mx-auto'>
        {
          posts && posts.map((post, idx)=>(
            <Post
            key={idx} 
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

export default ArtistPage