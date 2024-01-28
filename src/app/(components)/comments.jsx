"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button';

const Comments = ({ id }) => {
  const [ comments, setComments ] = React.useState("")
  const [ upComment, setUpComment ] = React.useState(null)
  const { data } = useSession()
  const handleComment = async () => {
    console.log(comments)
    const res = await fetch(`/api/comment/${id}`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        username : data?.user?.username,
        avatar : data?.user?.image,
        comment : comments
      })
    })
    if (res.ok) {
      console.log("comment okay")
    }
    fetchComments()
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
    <div className='max-w-7xl mx-auto py-10 rounded-md bg-card p-2'>
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
    </div>
  )
}

export default Comments