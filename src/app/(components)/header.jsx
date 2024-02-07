"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from './ui/modetoggle'
import { FaTimes, FaUserCircle } from "react-icons/fa";
import UserDropdown from './userdropdown'
import { signOut, useSession } from 'next-auth/react'
import { IoIosAdd } from "react-icons/io";
import AddImage from './addimage'
import { Montserrat } from 'next/font/google'
import { SideBar } from './sidebar'
import SearchBar from './searchbar'
import { CiSearch } from 'react-icons/ci'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'


const montserrat = Montserrat({ subsets: ['latin'] })


const Header = () => {
  const { data } = useSession()
  const [ isSearch, setIsSearch ] = React.useState(false)
  console.log(isSearch)
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

        <SearchBar className="relative hidden sm:block"/>
        <div className='relative flex items-center space-x-2 sm:space-x-4'>
          {
            data && (
              <div className="sm:block hidden">
                <p>Hello { data?.user?.username }!</p>
              </div>
            )
          }

          <UserDropdown />
          <CiSearch 
          className='text-xl cursor-pointer sm:hidden'
          onClick={() => setIsSearch(true)}
          />
          {
            isSearch && (
              <div className="absolute right-0 pr-5 z-[1000] flex items-center space-x-2 bg-card justify-center pl-5 py-2 sm:hidden rounded-lg">
                <SearchBar className="relative sm:hidden"/>
                <FaTimes 
                className="text-xl cursor-pointer"
                onClick={() => setIsSearch(false)}
                />
              </div>
            )
          }
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