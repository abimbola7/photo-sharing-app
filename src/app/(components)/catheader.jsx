import Image from 'next/image'
import React from 'react'

const CatHeader = ({ category }) => {
  return (
    <div className='relative w-full'>
      <Image 
      src={category.imageSrc} 
      width={1000}
      height={400}
      alt="image"
      priority
      quality={100}
      className='object-cover object-center w-full h-64 brightness-90'
      />
      <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full border pointer-events-none z-56 borde-red-500'>
        <p className='text-2xl font-semibold tracking-widest'>
          Category : {" "}
          <span>{ category.name }</span>
        </p>
      </div>
    </div>
  )
}

export default CatHeader