"use client"
import React from 'react'
import { useSession } from 'next-auth/react'


const LikesCount = ({ name }) => {
  const { data } = useSession()
  const [ totalLikes, setTotalLikes ] = React.useState(0)

  const getNoLikes = async () => {
    try {
      const res =  await fetch(`/api/getnolikes/${name}`, {
        cache : "no-store"
      })
      const { likesCount } = await res.json()
      console.log(likesCount, "TOTAL LIKES")
      setTotalLikes(likesCount[0]?.totalLikes)
      
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(()=>{
    getNoLikes()
  }, [])
  console.log(totalLikes)
  return (
    <div className="flex flex-col border-r p-2">
      <p className="text-lg sm:text-2xl font-bold text-center">{ totalLikes }</p>
      <p className="text-md sm:text-xl font-semibold text-gray-400 !block uppercase">likes</p>
    </div>
  )
}

export default LikesCount