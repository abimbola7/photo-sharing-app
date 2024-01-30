"use client"
import React from 'react'

const CommentsCount = ({ name }) => {
  const [ totalComments, setTotalComments ] = React.useState(0)
  const getNoComments = async () => {
    try {
      const res =  await fetch(`/api/getnocomments/${name }`, {
        cache : "no-store"
      })
      const { commentCount }  = await res.json()
      console.log(commentCount, "TOTAL LIKES")
      setTotalComments(commentCount[0].totalComments)

      
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(()=>{
    getNoComments()
  }, [])
  return (
    <div className="flex flex-col border-r p-2">
      <p className="text-lg sm:text-2xl font-bold text-center">{ totalComments }</p>
      <p className="text-md sm:text-xl font-semibold text-gray-400 !block uppercase">Comments</p>
    </div>
  )
}

export default CommentsCount