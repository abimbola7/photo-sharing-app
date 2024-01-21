"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { FaTimes } from "react-icons/fa";

const Tags = () => {
  const [ tags, setTags ] = React.useState(["cat", "dog"])
  return (
    <div className='py-1 px-2 h-10 w-full border rounded-md flex items-center '>
      <div className='flex items-center flex-row space-x-2'>
        {
          tags.map(tag=>(
            <div className='bg-accent rounded-full px-2 py-1 mr-1 flex items-center space-x-2' key={tag}>
              <span className='mr-2'>{tag}</span>
              <Button asChild variant="destructive" size="icon" className="w-2">
                {/* <FaTimes className='text-xs'/> */}
                {/* <times /> */}
              </Button>
            </div> 
          ))
        }
      </div>
    </div>
  )
}

export default Tags