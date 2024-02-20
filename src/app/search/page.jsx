import React from 'react'
import Post from '../(components)/post'
import { Montserrat } from 'next/font/google'
import { redirect } from 'next/navigation'


const montserrat = Montserrat({ subsets: ['latin'] })

const getSearchs = async (search) => {
  try {
    console.log("dddddd")
    const res =  await fetch(`https://art-nook.vercel.app/api/search/${search}`, {
      cache : "no-store"
    })
    if (!res.ok) {
      throw new Error()
    }
    return res.json();
  }catch(error) {
    console.log(error)
  }
}


const Search = async ({searchParams}) => {
  // const router = useRouter()
  const { results } = await getSearchs(searchParams.search)

  return (
    <>
      {
        results.length > 0 ? (
          <div className='max-w-7xl mx-auto p-2'>
            <h1 className="text-2xl font-medium">
              Search Results for <span className="">&apos;{searchParams.search}&apos;</span>
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 py-5 gap-4'>
              {
                results && results.map((post)=>(
                  <Post 
                  key={post._id} 
                  title={post.title} 
                  name={post.author.username}
                  avatar={post.author.avatar}
                  createdAt={post.createdAt} 
                  image={post.image}/>
                ))
              }
            </div>
          </div>   
        ) : (
          <div className="max-w-7xl mx-auto p-2 min-h-screen flex justify-center pt-10">
            <p className={`text-center ${montserrat.className}`}>Could not find what you&apos;re looking for.</p>
          </div>
        )
      }
    </>
  )
}

export default Search