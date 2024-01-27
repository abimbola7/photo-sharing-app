"use client"
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Post = ({ title, image, createdAt, name, avatar }) => {
  const router = useRouter()
  // console.log(post)
  return (
    <div  className='rounded-xl bg-card overflow-hidden border border-border'>
      <div className='flex items-center justify-between p-2'>
        <div className='flex items-center cursor-pointer group'>
          <img src={avatar} className='w-10 h-10 mr-2 rounded-full' alt="author"/>
          <Link href={`/artist/${name}`} className='text-gray-600 transition-colors duration-200 hover:text-red-600 inline-block'>
            {name}  
          </Link>
        </div>
        <p className='text-gray-400 text-xs font-semibold'>{moment(createdAt).format('MMMM Do YYYY')}</p>
      </div>
      <div className="overflow-hidden h-fit relative">
        <div className='absolute top-0 left-0 z-20 w-full h-full p-3 flex items-end pointer-events-none'>
          <p className='font-semibold text-xl'>{ title }</p>
        </div>
        <Link href={`/post/${title}`} className="overflow-hidden mt-2">
          <Image 
          src={image} 
          width={700} 
          height={700} 
          quality={100} 
          alt="img"
          className='object-cover object-center w-full h-80 duration-200 transition-transform hover:scale-105 brightness-95'
          />
        </Link>
      </div>
    </div>
  )
}

export default Post