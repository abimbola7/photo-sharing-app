import Image from 'next/image';
import React from 'react'
import { MdOutlineThumbUp } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import moment from 'moment';
import Link from 'next/link';
import { IoIosCheckmarkCircle } from "react-icons/io";
import RelatedPosts from '@/app/(components)/relatedposts';
import Likes from '@/app/(components)/likes';
import dynamic from 'next/dynamic';
import { Montserrat } from 'next/font/google';
import Comments from '@/app/(components)/comments';



export const montserrat = Montserrat({ subsets: ['latin'] })

const getPostByName = async (id) => {
  console.log(id, "IDddd")
  const res = await fetch(`https://photo-sharing-app-iu6c.vercel.app/api/posts/${id}`, {
    cache: "no-store"
  })
  console.log(res.ok)
  if (!res.ok) {
    throw new Error("Failed to get Post")
  }
  // console.log(await res.json())
  return res.json();
}


const Post = async ({ params }) => {
  // console.log(params.id, "PARAMS")
  const { post } = await getPostByName(params.id)
  // console.log(post.likes, "POST")
  return (
    <>
      <div className={`p-3 mx-auto mt-10 rounded-lg max-w-7xl bg-card`}>
        <div className="flex flex-wrap space-x-2">
          {
            post?.category?.map((category, index) => (
              <Link href={`/category/${category}`} key={index} className={`font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200 text-md md:text-lg hover:text-red-500 ${montserrat.className}`}>{category}</Link>
            ))
          }
        </div>
        <h1 className='mt-3 font-bold sm:text-2xl lg:text-4xl'>{post?.title}</h1>
        <Likes id={post?._id}/>

        <Image 
        src={post?.image} 
        width={1000} 
        height={800} 
        quality={100} 
        priority 
        alt={"img"}
        className='object-cover object-center w-full mt-5 rounded-lg'
        />
        
        <p className={`my-8 text-lg ${montserrat.className}`}>{post?.content}</p>
        <div className={`flex flex-row flex-wrap gap-2 mt-5 ${montserrat.className}`}>
          {
            post?.tags?.map((tag, index) => (
              <div className="flex items-center justify-center px-5 py-1 border rounded-full cursor-pointer border-destructive" key={index}>
                <p className="text-sm">{ tag }</p>
              </div>
            ))
          }
        </div>

        <div className={`mt-5 ${montserrat.className}`}>
          <p className='flex items-center'>
            <IoTimeOutline className='mr-1 text-lg'/>
            <span className='text-sm'>{moment(post?.createdAt).format('MMMM Do YYYY')}</span>
          </p>
        </div>
      </div>

      <div className='flex items-center justify-center p-3 mx-auto mt-16 mb-10 rounded-lg max-w-7xl bg-card'>
        <Link href={`/artist/${post?.author?.username}`}>
          <img src={post?.author?.avatar} alt={"img"} className="w-20 h-20 md:w-40 md:h-40 rounded-full p-[1.5px] border-2 border-red-500 cursor-pointer object-cover transition-transform  duration-200 ease-out"/>
          <div className='flex items-center gap-1 mt-2 text-lg font-semibold text-center md:text-2xl justify-center items-center'>
            <span>{post?.author?.username} <IoIosCheckmarkCircle className='text-red-500 inline-flex'/></span>
          </div>
        </Link>
      </div>

      <Comments id={post?._id}/>

      <div className='p-3 mx-auto mt-16 mb-10 rounded-lg max-w-7xl bg-card '>
        <h1 className="text-2xl font-semibold text-center uppercase">Related Posts</h1>
        <RelatedPosts categories={post?.category} id={post?._id}/>
      </div>
    </>
  )
}

export default Post