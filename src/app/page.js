import Carousel from './(components)/ui/carousel/carousel'
import Categories from './(components)/categories'




export default async function Home() {
  return (
    <div className='relative min-h-screen'>
        <div className='w-full h-screen overflow-hidden relative z-[1]'>
          <Carousel/>
        </div>
      <Categories/>
    </div>
    
  )
}
