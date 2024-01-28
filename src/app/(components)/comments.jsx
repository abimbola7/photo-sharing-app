"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button';
import moment from 'moment';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] })
const Comments = ({ id }) => {
  const date = new Date()
  const [ comments, setComments ] = React.useState("")
  const [ upComment, setUpComment ] = React.useState(null)
  const { data } = useSession()
  const handleComment = async () => {
    console.log(comments)
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
      console.log("comment okay")
    }
    fetchComments()
    setComments("")
  }

  const fetchComments = async ()=> {
    const res = await fetch(`/api/comment/${id}`)
    if (res.ok) {
      console.log("okay")
      let { comments } = await res.json()
      setUpComment(comments.comments)
    }
  }
  
  React.useEffect(()=>{
    fetchComments()
  }, [id])

  console.log(upComment, "COMMENTS")

  return (
    <div className='max-w-7xl mx-auto py-10 rounded-md p-2'>
      {/* comments */}
      <div className={`p-4 rounded-md mb-10 max-w-4xl mx-auto space-y-4 ${montserrat.className}`}>
      <p className='text-center'>Comments</p>
       {upComment && upComment.length > 0  ? upComment.map((comment, index)=>(
          <div key={index} className="bg-[#222222] rounded-lg flex flex-row space-x-3 p-2">
            <img src={comment.avatar} className="w-14 h-14 object-cover p-1 border rounded-full flex-shrink-0" />
            <div className="w-full space-y-4">
              <div className="flex flex-row space-x-4 text-sm">
                <p className="text-white font-bold">{comment.username}</p>
                <p className="text-white">{moment(comment.createdAt).format('MMMM Do YYYY')}</p>
              </div>
              <p>{ comment.comment }</p>
            </div>
          </div>
       )) : (
        <p className='text-center'>There are no comments</p>
       )
       } 

       {
        data && (

          <div className="flex items-center space-x-3">
            <img src={data?.user?.image} alt="user" className="w-20 h-20 object-cover p-1 border rounded-full flex-shrink-0"/>
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
        )
       }
      </div>
    </div>
  )
}

export default Comments