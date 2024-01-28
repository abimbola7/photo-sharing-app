"use client"

import React from 'react'
import { IoMdThumbsUp } from "react-icons/io";
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';


const Likes = ({ id }) => {
  const { data } = useSession();
  const [like, setLike] = React.useState();
  const [ hasLiked, setHasLiked ] = React.useState(false);

  const handleLikes = async () => {
    if (!hasLiked) {
      // console.log(id)
      const res = await fetch(`/api/likes/${id}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          username : data?.user?.id
        })
      })
      if (res.ok) {
        console.log("delete okay")
      }
    } else {
      const res = await fetch(`/api/likes/${id}`, {
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          username : data?.user?.id
        })
      })
      if (res.ok) {
        console.log("delete okay")
      }
    }
    fetchLikes()
  }
  
  const fetchLikes = async ()=> {
    const res = await fetch(`/api/likes/${id}`)
    if (res.ok) {
      console.log("okay")
      let { likes } = await res.json()
      setLike(likes.likes)
    }
  }
  
  React.useEffect(()=>{
    fetchLikes()
  }, [id])

  React.useEffect(()=>
    setHasLiked(like?.findIndex(like => like === data?.user?.id) !== -1
    ), [ like ])
    
  // console.log(like)
  // console.log(hasLiked)


  return (
    <>
      {
        data && (
            <div className='flex items-center mt-4 space-x-2'>
              <Button asChild variant="outline" size="icon">
                <IoMdThumbsUp 
                onClick={handleLikes}
                className={`transition duration-200 cursor-pointer text-lg md:text-2xl hover:text-red-500 ${hasLiked && "text-red-500"}`}/>
              </Button>
              <div className='px-2 py-1 rounded-full bg-accent'>{ like?.length }</div>
            </div>
        )
      }
    </>
  )
}

export default Likes