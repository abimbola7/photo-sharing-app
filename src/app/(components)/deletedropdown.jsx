"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { BorderDottedIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const DeleteDropdown = ({ id, username }) => {
  const { data  } = useSession();
  const router = useRouter();


  const deletePost = async () => {
    const res = await fetch(`/api/posts/${id}`, {
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json"
      },
    })
    if (res.ok) {
      console.log("delete okay")
      router.push("/")
    }
  }
  return (
    <>
      {
        data?.user?.username === username && (
      <DropdownMenu className="absolute right-10">
        <DropdownMenuTrigger>
          <Button asChild variant="outline" size="icon">
            <BorderDottedIcon className="w-6 h-6"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline"  size="lg" className="border-none text-red-500">
                Delete Post
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete your post. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deletePost}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
        )
      }
    </>
  )
}

export default DeleteDropdown