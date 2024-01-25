"use client"
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Post = ({ post }) => {
  const router = useRouter()
  console.log(post)
  return (
    <div  className='rounded-xl bg-card'>
      <div className='flex items-center justify-between p-2'>
        <div className='flex items-center cursor-pointer group'>
          <img src={post.author.avatar} className='w-10 h-10 mr-2 rounded-full' alt="author"/>
          <Link href={`/artist/${post.author.username}`} className='text-gray-600 transition-colors duration-200 hover:text-red-600 inline-block'>
            {post.author.username}  
          </Link>
        </div>
        <p className='text-gray-400 text-xs font-semibold'>{moment(post.createdAt).format('MMMM Do YYYY')}</p>
      </div>
      <Link href={`/post/${post.title}`} className="">
        <Image 
        src={post.image} 
        width={500} 
        height={600} 
        quality={100} 
        alt="img"
        className='object-cover object-center w-full h-80'
        />
      </Link>
    </div>
  )
}

export default Post