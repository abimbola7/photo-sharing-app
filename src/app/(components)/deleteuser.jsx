"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import React from 'react'
import { TiUserDelete } from "react-icons/ti";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const DeleteUser = ({ username, id }) => {
  const { data } = useSession()
  console.log(id, data?.user?.id);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const router = useRouter();
  const handleUser = async () => {
    setIsLoading(true)
    const res = await fetch(`/api/deleteuser/${username}`, {
      method: "DELETE",
      headers : {
        "Content-Type" : "application/json"
      }
    })
    if (res.ok) {
      setIsLoading(false)
      router.push("/");
      setTimeout(()=>{
        signOut();
      }, 2000)
    }
  }
  return (
    <>
      {
        data?.user?.id === id &&  (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline"  size="icon" className="text-destructive">
                <TiUserDelete className='text-3xl'/>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="space-y-1">
                  <span>Are you sure you want to delete your account? </span>
                  <span>Deleting your account will permanently remove all of your information, including your posts and comments. This action cannot be undone.</span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                size="default" 
                className="text-white bg-destructive hover:bg-destructive"
                onClick={handleUser}
                >
                  {
                    isLoading ? <img src="/loader.svg" alt="spinner" className="w-6 h-6"/> : "Confirm"
                  }
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      }
    </>
  )
}

export default DeleteUser