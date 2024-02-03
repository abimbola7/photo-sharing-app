"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CiUser, CiLogout } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaUserCircle } from "react-icons/fa"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
// type Checked = DropdownMenuCheckboxItemProps["checked"]

const UserDropdown = () => {
  const router = useRouter();
  const { data } = useSession()


  return (
    <DropdownMenu className="pb-0 mb-0 border-none h-fit">
      <DropdownMenuTrigger asChild className="cursor-pointer">
          {
            !data ? 
            <FaUserCircle className='text-xl'/> : 
            <img 
            src={data?.user?.image}
            alt={data?.user?.username}
            loading="lazy"
            className="object-cover object-center w-10 h-10 border-none rounded-full"
            />
          }
      </DropdownMenuTrigger>
      {
        data ? (
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem 
                className="py-1 cursor-pointer focus:border-none hover:border-none hover:bg-accent"
                onClick={()=>router.push(`/artist/${data?.user?.username}`)}
                >
                  <div className="grid gap-4">
                    <div  className='flex items-center justify-start space-x-2 hover:text-red-500'>
                      <CiUser className="text-2xl"
                      />
                      <p>Profile</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                className="py-1 cursor-pointer focus:border-none hover:border-none hover:bg-accent"
                onClick={signOut}
                >
                  <div className="grid gap-4">
                    <div  className='flex items-center justify-start space-x-2 hover:text-red-500'>
                      <CiLogout className="text-2xl"
                      />
                      <p>Logout</p>
                    </div>
                  </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="flex flex-col w-56 ">
            <Link href="/auth/signin" className="py-1">
              Login
            </Link>
            <Link href="/register" className="py-1">
              Register
            </Link>
          </DropdownMenuContent>
        )
      }
    </DropdownMenu>
  )
}

export default UserDropdown;