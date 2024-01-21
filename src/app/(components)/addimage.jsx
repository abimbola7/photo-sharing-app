"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CiImageOn, CiCirclePlus } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import Link from 'next/link';

const AddImage = () => {
  const { data } = useSession();
  return (
    <>
      {
        data && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full bg-destructive">
                <IoIosAdd className='text-2xl'/>
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <Link href="/submit-image" className='flex items-center justify-center space-x-2'>
                  <CiImageOn />
                  <p>Add Image</p>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>    
        )
      }
    </>
  )
}

export default AddImage