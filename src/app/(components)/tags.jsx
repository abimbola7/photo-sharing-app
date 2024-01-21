"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { X } from "lucide-react"

const Tags = (props) => {
  const [ tags, setTags ] = React.useState([])
  const [ value, setValue ] = React.useState("");

  const tagHandler = (e) => {
    console.log(e.key)
    if (e.key === "Enter" || e.key === " "){
      const pickedTag = tags.find(tag=>tag === value.trim())
      if (pickedTag) return
      setTags([...tags, value.trim()])
      setValue("")
      props.tagHand(tags)
    }
  }
  return (
    ?</div>
  )
}

export default Tags