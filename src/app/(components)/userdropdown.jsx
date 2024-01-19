"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
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
  const { data } = useSession()
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          {
            !data ? 
            <FaUserCircle className='text-xl'/> : 
            <img 
            src={data?.user?.image}
            alt={data?.user?.username}
            loading="lazy"
            className="rounded-full object-cover object-center w-10 h-10"
            />
          }
        </button>
      </DropdownMenuTrigger>
      {
        data ? (
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem 
                className="cursor-pointer py-1 focus:border-none hover:border-none hover:bg-accent"
                onClick={signOut}
                >
                  Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="w-56">
            <Link href="/auth/signin">
              <DropdownMenuItem className="cursor-pointer py-1 focus:border-none hover:border-none hover:bg-accent">Login</DropdownMenuItem>
            </Link>
            <Link href="/register">
              <DropdownMenuItem className="cursor-pointer py-1 focus:border-none hover:border-none hover:bg-accent">Register</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        )
      }
    </DropdownMenu>
  )
}

export default UserDropdown;