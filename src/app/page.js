import Carousel from './(components)/ui/carousel/carousel'
import Categories from './(components)/categories'



async function getLatestPosts() {
  try {
    const res = await fetch('http://localhost:3000/api/latestposts', {
      cache : "no-store",
      method : "GET",
    })
    if (res.ok) {
      const data =  await res.json()
      return data.latest
    }
  }catch(error){
    console.log(error)
  }
}



export default async function Home() {
  const latestPosts = await getLatestPosts()
  // console.log(latestPosts, "latestpostssssssss")
  return (
    <div className='relative min-h-screen'>
        <div className='w-full h-screen overflow-hidden relative z-[1]'>
          <Carousel posts={ latestPosts }/>
        </div>
      {/* <div>
        <Carousel />
      </div> */}
      {/* <Swipe /> */}
      <Categories/>
    </div>
    
  )
}
