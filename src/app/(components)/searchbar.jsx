"use client"
import React from 'react'
import { CiSearch } from "react-icons/ci";
import { useRouter } from 'next/navigation';


const SearchBar = (props) => {
  const router = useRouter()
  const [ search, setSearch ] = React.useState("")

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?search=${search}`);
    // console.log(search);
  }
  return (
    <form 
    onSubmit={handleSearch}
    className={"rounded-full " + props.className}>
      <div className="absolute top-3 left-2">
        <CiSearch className="text-lg"/>
      </div>
      <input 
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      placeholder="Search..."
      className={`border py-2 flex-1 px-8 rounded-full focus:outline-none w-48 sm:w-56 duration transition-all focus:56 sm:focus:w-72 ${props.className1} `}/>
    </form>
  )
}

export default SearchBar