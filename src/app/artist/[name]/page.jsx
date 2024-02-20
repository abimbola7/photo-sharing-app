

import CommentsCount from '@/app/(components)/commentscount'
import DeleteUser from '@/app/(components)/deleteuser'
import EditImage from '@/app/(components)/editimage'
import LikesCount from '@/app/(components)/likescount'
import Post from '@/app/(components)/post'
import UserBio from '@/app/(components)/userbio'
import { Post as PP } from '@/app/(models)/user'
import { Button } from '@/components/ui/button'
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
  const { post : artist } = await getArtist(params.name)
  const posts = await getRelatedPost(params.name)
  // console.log(posts, "POSTSSSS")
  return (
    <div className='w-full'>
      <div className="relative group">
        <img src="/images/main.jpg" alt="img" className='object-cover object-center w-full h-96 brightness-75'/>
        <div className="absolute top-0 right-0 z-50 flex flex-row items-center p-2 space-x-3 transition-all duration-200 opacity-0 group-hover:opacity-100">
          <UserBio name={artist.username} id={artist._id}/>
          <DeleteUser username={artist.username} id={artist._id}/>
        </div>
        <div className="absolute bottom-0 left-0 flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center">
            <EditImage avatar={artist.avatar} name={artist.username}/>
            <p className='flex items-center gap-1 mt-2 text-lg font-semibold text-center md:text-2xl'>
              <span>{artist.username}</span>
              <IoIosCheckmarkCircle className='text-red-500'/>
            </p>
          </div>
          <div className="flex flex-col items-center w-full p-1 mt-2 bg-card">
            <div className='flex items-center justify-center'>
              <div className="flex flex-col p-2 border-r">
                <p className="text-lg font-bold text-center sm:text-2xl">{ posts.length}</p>
                <p className="text-md sm:text-xl font-semibold text-gray-400 !block uppercase">posts</p>
              </div>
              <LikesCount name={artist.username}/>
              <CommentsCount name={artist.username} />
            </div>
          </div>
        </div>
      </div>
      {/* relatedposts */}
      <div className='max-w-[95%] mx-auto p-3'>
        <h1 className='text-2xl font-semibold text-center uppercase'>POSTS</h1>
      </div>

      {
        posts.length > 0 ? (
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
        ) : (
          <div className="text-center mt-5">
            <Button size="lg" className="bg-destructive text-white" asChild>
              <Link href="/submit-image">
                Add Post
              </Link>
            </Button>
            </div>
        )
      }
    </div>
  )
}

export default ArtistPage