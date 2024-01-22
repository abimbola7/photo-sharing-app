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
    <DropdownMenu className="pb-0 mb-0 h-fit">
      <DropdownMenuTrigger asChild>
        <button>
          {
            !data ? 
            <FaUserCircle className='text-xl'/> : 
            <img 
            src={data?.user?.image}
            alt={data?.user?.username}
            loading="lazy"
            className="object-cover object-center w-10 h-10 rounded-full"
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
          <DropdownMenuContent className="w-56">
              <DropdownMenuItem
               className="w-full cursor-pointer focus:border-none hover:border-none hover:bg-accent">
               <div className="w-full">
                <Link
                href="/auth/signin"
                className="w-full px-2 py-1 border border-red-500"
                >
                  Login
                </Link> 
               </div>
              </DropdownMenuItem>
              <DropdownMenuItem
               className="w-full cursor-pointer focus:border-none hover:border-none hover:bg-accent">
               <div 
              //  onClick={router.push("/register")}
               className="w-full px-2 py-1 border border-red-500"
               >
                Register
               </div>
              </DropdownMenuItem>
              
            {/* </Link> */}
          </DropdownMenuContent>
        )
      }
    </DropdownMenu>
  )
}

export default UserDropdown;