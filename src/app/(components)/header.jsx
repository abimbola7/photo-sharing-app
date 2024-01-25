"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from './ui/modetoggle'
import { FaUserCircle } from "react-icons/fa";
import UserDropdown from './userdropdown'
import { signOut, useSession } from 'next-auth/react'
import { IoIosAdd } from "react-icons/io";
import AddImage from './addimage'


const Header = () => {
  const { data } = useSession()
  console.log(data);
  return (
    <header
    className='w-full  z-[1000] border'
    >
      <nav
      className='relative flex items-center justify-end max-w-6xl px-2 py-5 mx-auto space-x-4'
      >
        {
          data && (
            <div>
              <p>Hello { data?.user?.username }</p>
            </div>
          )
        }
        <UserDropdown />
        <ModeToggle />
        <AddImage/>
      </nav>
    </header>
  )
}

export default Header