"use client"

import React from 'react'
import { IoMdThumbsUp } from "react-icons/io";
// import { useSession } from 'next-auth/react';
import { Post } from '../(models)/user';


const Likes = () => {
  // const { data } = useSession();
  // const [like, setLike] = React.useState();
  // const [ hasLiked, setHasLiked ] = React.useState(false);

  // const handleLikes = async () => {
  //   if (hasLiked) {
  //     await Post.findByIdAndUpdate(id, {  })
  //   }
  // }

  // React.useEffect(()=>{
  //   setLike(likes)
  // }, [likes])



  return (
    <div className='flex items-center mt-4 space-x-2'>
      <IoMdThumbsUp 
      // onClick={handleLikes}
      className='text-xlg md:text-2xl text-white transition duration-200 cursor-pointer hover:text-red-500'/>
      {/* <div className='px-2 py-1 rounded-full bg-accent'>{ likes?.length }</div> */}
    </div>
  )
}

export default Likes