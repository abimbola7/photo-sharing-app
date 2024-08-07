

import React from 'react'
import CategoryItem from './categoryitem';


const getCategories = async () => {
  try {
    const res =  await fetch("https://art-nook.vercel.app/api/getcategories", {
      cache : "no-store"
    })
    return res.json();
  } catch (error) {
    console.log(error)
  }
}


const Categories = async () => {
  const { cat } = await getCategories()
  console.log(cat)
  return (
    <div className='max-w-[95%] py-10 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {
        cat && cat.map((item, id)=>(
          <CategoryItem
          key={item._id}
          id={item._id}
          name={item.name}
          imageSrc={item.imageSrc}
          />
        ))
      }
    </div>
  )
}

export default Categories
