"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from './ui/modetoggle'
import { FaUserCircle } from "react-icons/fa";
import UserDropdown from './userdropdown'
import { useSession } from 'next-auth/react'


const Header = () => {
  const { data } = useSession()
  console.log(data);
  return (
    <header
    className='w-full border-b border-muted'
    >
      <nav
      className='relative flex justify-end items-center mx-auto px-2 py-5 max-w-6xl space-x-3'
      >
        <UserDropdown />
        {/* <div className='flex flex-row rounded-full p-3 cursor-pointer bg-slate-950'>
          <FaUserCircle className='text-xl'/>
        </div> */}
        <ModeToggle />
      </nav>
    </header>
  )
}

export default Header