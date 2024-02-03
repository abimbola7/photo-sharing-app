"use client"
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Montserrat } from 'next/font/google';



export const montserrat = Montserrat({ subsets: ['latin'] })



const Post = ({ title, image, createdAt, name, avatar }) => {
  const router = useRouter()
  // console.log(post)
  return (
    <div  className='overflow-hidden border rounded-xl bg-card border-border'>
      <div className={`flex items-center justify-between p-2 ${montserrat.className}`}>
        <div className={`flex items-center cursor-pointer group`}>
          <img src={avatar} className='w-10 h-10 mr-2 rounded-full' alt="author"/>
          <Link href={`/artist/${name}`} className='inline-block text-gray-600 transition-colors duration-200 hover:text-red-600'>
            {name}  
          </Link>
        </div>
        <p className='text-xs font-semibold text-gray-400'>{moment(createdAt).format('MMMM Do YYYY')}</p>
      </div>
      <div className="relative overflow-hidden">
        <div className='absolute top-0 left-0 z-20 flex items-end w-full h-full p-3 pointer-events-none'>
          <p className='text-xl font-semibold truncate'>{ title }</p>
        </div>
        <Link href={`/post/${title}`} className="h-full mt-2 overflow-hidden">
          <Image 
          src={image} 
          width={700} 
          height={700} 
          quality={100} 
          alt="img"
          className='object-cover object-center w-full transition-transform duration-200 h-80 hover:scale-105 brightness-95'
          />
        </Link>
      </div>
    </div>
  )
}

export default Post