"use client"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { CiImageOn } from "react-icons/ci"

export function SideBar() {
  const { data } = useSession()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" asChild size="icon" className="p-1 cursor-pointer">
          <HamburgerMenuIcon className="sm:hidden"/>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Hello { data?.user?.username }</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Link href="/submit-image" className='flex items-center justify-start space-x-2 hover:text-red-500'>
            <CiImageOn className="text-2xl"
            />
            <p>Add Image</p>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

