"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

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
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
    <DropdownMenu className="pb-0 mb-0 border-none h-fit">
      <DropdownMenuTrigger asChild>
        <button className="border-none">
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
        </button>
      </DropdownMenuTrigger>
      {
        data ? (
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem 
                className="py-1 cursor-pointer focus:border-none hover:border-none hover:bg-accent"
                onClick={signOut}
                >
                  Logout
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