import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryItem = ({ item, id, name, imageSrc }) => {
  console.log(imageSrc)
  return (
    <div className='relative transition-transform duration-500 hover:-translate-y-2'>
      <div className='absolute top-0 left-0 z-50 w-full h-full p-8 pointer-events-none'>
        <p className='text-2xl font-semibold tracking-wider'>{ name }</p>
      </div>
      <Link href={`/category/${name}`} className='relative'>
        <Image
        src={imageSrc}
        width={700}
        height={900}
        alt='image'
        quality="100"
        className='object-cover object-center h-96 rounded-2xl brightness-90'
        />
      </Link>
    </div>
  )
}

export default CategoryItem