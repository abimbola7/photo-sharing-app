import Image from 'next/image'
import Carousel from './(components)/ui/carousel/carousel'
import Categories from './(components)/categories'

export default function Home() {
  return (
    <div className='relative min-h-screen'>
      {/* <div className='absolute top-0 left-0 w-full h-screen overflow-hidden '>
        <Carousel />
      </div> */}
      <Categories/>
    </div>
    
  )
}
