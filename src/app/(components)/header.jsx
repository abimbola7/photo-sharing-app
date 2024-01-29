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
import { Montserrat } from 'next/font/google'
import { SideBar } from './sidebar'
import SearchBar from './searchbar'


const montserrat = Montserrat({ subsets: ['latin'] })


const Header = () => {
  const { data } = useSession()
  console.log(data);
  return (
    <header
    className={`w-full z-[1000] ${montserrat.className}`}
    >
      <nav
      className='relative flex items-center justify-between max-w-6xl px-2 py-4 mx-auto space-x-4'
      >
        <Link href={"/"}>
          <img src='/artnook.svg' className='w-32' />
        </Link>
        <SearchBar />
        <div className='relative flex items-center space-x-2 sm:space-x-4'>
          {
            data && (
              <div className="sm:block hidden">
                <p>Hello { data?.user?.username }!</p>
              </div>
            )
          }
          <UserDropdown />
          <ModeToggle />
          <AddImage/>
          {data && (
            <SideBar />
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header