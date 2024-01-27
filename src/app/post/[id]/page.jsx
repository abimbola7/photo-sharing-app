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



// const Likes = dynamic(() => import('../../(components)/likes'), {
//   ssr: false, // Optional: Disable server-side rendering if needed
// });
const getPostByName = async (id) => {
  // console.log(id, "ID")
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
      <div className='p-3 mx-auto mt-10 rounded-lg max-w-7xl bg-card'>
        <div className="flex flex-wrap space-x-2">
          {
            post.category?.map((category, index) => (
              <Link href={`/category/${category}`} key={index} className='text-md md:text-lg font-medium text-gray-300 duration-200 transition-colors hover:text-red-500'>{category}</Link>
            ))
          }
        </div>
        <h1 className='mt-3 sm:text-2xl lg:text-4xl font-bold'>{post.title}</h1>
        <Likes/>

        <Image 
        src={post.image} 
        width={1000} 
        height={800} 
        quality={100} 
        priority 
        alt={"img"}
        className='object-cover object-center w-full mt-5 rounded-lg'
        />
        
        <p className='mt-2 text-lg'>{post.content}</p>
        <div className="flex flex-row flex-wrap gap-2 mt-5">
          {
            post.tags?.map((tag, index) => (
              <div className="flex justify-center items-center px-5 py-1 rounded-full cursor-pointer border border-destructive" key={index}>
                <p className="text-sm">{ tag }</p>
              </div>
            ))
          }
        </div>

        <div className="mt-5">
          <p className='flex items-center'>
            <IoTimeOutline className='mr-1'/>
            <span className='text-sm'>{moment(post.createdAt).format('MMMM Do YYYY')}</span>
          </p>
        </div>
      </div>

      <div className='p-3 mb-10 mx-auto mt-16 rounded-lg max-w-7xl bg-card flex items-center justify-center'>
        <Link href={`/artist/${post.author.username}`}>
          <img src={post.author.avatar} alt={"img"} className="w-20 h-20 md:w-40 md:h-40 rounded-full p-[1.5px] border-2 border-red-500 cursor-pointer object-cover transition-transform  duration-200 ease-out"/>
          <p className='text-lg md:text-2xl font-semibold text-center mt-2 flex items-center gap-1'>
            <span>{post.author.username}</span>
            <IoIosCheckmarkCircle className='text-red-500'/>
          </p>
        </Link>
      </div>

      <div className='p-3 mb-10 mx-auto mt-16 rounded-lg max-w-7xl bg-card '>
        <h1 className="text-center text-2xl font-semibold uppercase">Related Posts</h1>
        <RelatedPosts categories={post.category} id={post._id}/>
      </div>
    </>
  )
}

export default Post