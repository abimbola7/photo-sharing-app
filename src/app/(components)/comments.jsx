"use client"
import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button';
import moment from 'moment';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import DeleteComment from './deletecomment';

const montserrat = Montserrat({ subsets: ['latin'] })
const Comments = ({ id, valComment }) => {
  const date = new Date()
  const [ comments, setComments ] = React.useState("")
  const [ upComment, setUpComment ] = React.useState(null)
  // const [ noComment, setNoComment ] = React.useState(0)
  const { data } = useSession()
  const handleComment = async () => {
    // console.log(comments)
    if (comments.trim() === "") returnw
    const res = await fetch(`/api/comment/${id}`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        username : data?.user?.username,
        avatar : data?.user?.image,
        comment : comments,
        createdAt : date.toISOString()
      })
    })
    if (res.ok) {
      // console.log("comment okay")
    }
    fetchComments()
    setComments("")
  }

  const fetchComments = async ()=> {
    const res = await fetch(`/api/comment/${id}`)
    if (res.ok) {
      // console.log("okay")
      let { comments } = await res.json()
      setUpComment(comments.comments)
    }
  }

  const handleDelete = async (commentId) => {
    // console.log(commentId, id, "handle")
    const res = await fetch(`/api/comment/${commentId}`, {
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        id : id
      })
    })
    if (res.ok) {
      // console.log("delete okay")
    }
    fetchComments()
  }
  
  // console.log(upComment)

  React.useEffect(()=>{
    fetchComments()
  }, [id])

  // console.log(upComment, "COMMENTS")

  return (
    <div className='max-w-7xl mx-auto py-5 rounded-md p-2'>
      {/* comments */}
      <div className={`p-1 sm:p-4 rounded-md mb-10 max-w-4xl mx-auto space-y-4 ${montserrat.className}`}>
      <p className='text-center font-semibold text-xl'>Comments</p>
       {upComment && upComment.length > 0  ? upComment.map((comment, index)=>(
          <div key={index} className="dark:bg-[#222222] bg-[#5c5a5a] rounded-lg flex flex-row space-x-3 p-2">
            <img src={comment.avatar} className="w-14 h-14 object-cover p-1 border rounded-full flex-shrink-0" />
            <div className="w-full space-y-4">
              <div className="flex flex-row space-x-4 text-xs md:text-sm justify-between items-center">
                <Link href={`/artist/${comment.username}`} className="text-white font-bold hover:text-red-500">{comment.username}</Link>
                <div className="flex flex-row space-x-2 items-center">
                  <p className="text-white text-xs">{moment(comment.createdAt).format('MMMM Do YYYY')}</p>
                  {
                    data?.user?.username === comment.username && (
                      <DeleteComment id={comment._id} handComment={handleDelete}/>
                    )
                  }
                </div>
              </div>
              <p className='text-gray-300'>{ comment.comment }</p>
            </div>
          </div>
       )) : (
        <p className='text-center'>There are no comments</p>
       )
       } 

       {
        data ? (

          <div className="flex space-x-3">
            <img src={data?.user?.image} alt="user" className="h-14 w-14 sm:w-20 sm:h-20 object-cover p-1 border rounded-full flex-shrink-0"/>
            <div className=' w-full flex flex-col space-y-4'>
              <textarea 
              value={comments}
              onChange={(e)=>setComments(e.target.value)}
              className='flex-1 bg-muted pt-5 pl-5 focus:outline-none outline-none focus:border-none rounded-lg' 
              rows={5} 
              placeholder='Leave a Comment'
              />
              <Button 
              variant="destructive" 
              size="lg" 
              className="block"
              onClick={handleComment}
              >
                Post Comment
              </Button>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center'>
            <button 
            className='px-2 py-1 rounded-md bg-red-500'
            onClick={signIn}
            >Login to comment</button>
          </div>
        )
       }
      </div>
    </div>
  )
}

export default Comments