"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { BorderDottedIcon } from '@radix-ui/react-icons'
import React from 'react'
import { FaTrash } from 'react-icons/fa'

const DeleteComment = ({ id, handComment }) => {
  console.log(id, "comment id")
  const handleComment = () => {
    console.log(id)
    handComment(id)
  }
  return (
    <DropdownMenu className="absolute right-10">
        <DropdownMenuTrigger>
          <Button asChild variant="outline" size="smallIcon">
            <BorderDottedIcon className="w-6 h-6"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline"  size="lg" className="border-none text-red-500">
                Delete Comment
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete your comment. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleComment}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default DeleteComment