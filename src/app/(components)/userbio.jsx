"use client"
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { FaUserAstronaut } from "react-icons/fa";


const UserBio = ({ id, name }) => {
  console.log(id);
  const [ biog, setBiog ] = React.useState("")
  const [ content, setContent ] = React.useState("")
  const [ editMode, setEditMode ] = React.useState(false)
  const [ isEditing, setIsEditing ] = React.useState(false)
  const { data }  = useSession()

  const handleBio = async () => {
    setIsEditing(true)
    console.log(data?.user?.id)
    const res = await fetch(`/api/artist/${data?.user?.id}`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        bio : content
      })
    })
    if (res.ok) {
      console.log("delete okay")
    }
    fetchBio()
    setEditMode(prevState=>!prevState)
    setIsEditing(false)
  }

  const fetchBio = async () => {
    console.log(name, "name")
    const res = await fetch(`/api/artist/${name}`, {
      cache: "no-store"
    })
    console.log(res.ok)
    if (!res.ok) {
      throw new Error("Failed to get Post")
    }
    const { post: bio} = await res.json();
    console.log(bio)
    setBiog(bio.bio)
  }
  React.useEffect(()=>{
    fetchBio()
  },[])
  
  return (
    <div className={``}>
      <Dialog>
        <DialogTrigger asChild onClick={()=>setEditMode(false)}>
          <Button variant="outline" asChild size="icon" className="cursor-pointer">
            <FaUserAstronaut className='text-xs'/>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Bio</DialogTitle>
            {
              !editMode ? (
              <DialogDescription className="py-2 mt-5 text-center">
                {biog}
              </DialogDescription>
              ) : (
                <textarea 
                className='w-full focus:outline-none rounded-lg  px-3 py-3 border-[2px]'
                onChange={(e)=>setContent(e.target.value)}
                rows="3" 
                defaultValue={biog}
                />
              )
            }
          </DialogHeader>
            {
              id === data?.user?.id && ( 
              <DialogFooter>
                {
                  !editMode ? (
                    <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    onClick={()=>setEditMode(prevState=>!prevState)}
                    >
                    Edit Bio</Button>
                  ) : (
                    <Button 
                    disabled={isEditing}
                    type="submit" 
                    size="lg" 
                    className="w-full disabled:opacity-50"
                    onClick={handleBio}
                    >
                    Submit
                    </Button>
                  )
                }
              </DialogFooter>
              )
            }
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserBio