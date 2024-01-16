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

// type Checked = DropdownMenuCheckboxItemProps["checked"]

const UserDropdown = () => {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon"><FaUserCircle className='text-xl'/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href="/auth/signin">
          <DropdownMenuItem className="cursor-pointer py-1 focus:border-none hover:border-none hover:bg-accent">Login</DropdownMenuItem>
        </Link>
        <Link href="/register">
          <DropdownMenuItem className="cursor-pointer py-1 focus:border-none hover:border-none hover:bg-accent">Register</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown;