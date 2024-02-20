"use client"

import Image from 'next/image';
import React from 'react';
import { Button, Carousel as CC, Typography } from '@material-tailwind/react';
import Link from 'next/link';

const Carousel = () => {
  const [ latestPosts, setLatestPosts ] = React.useState(null);
  const getLatestPosts = async () => {
    try {
      const res = await fetch("/api/latestposts", {
        cache: "no-store",
        method : "GET"
      })
      if (res.ok) {
        const data =  await res.json()
        // console.log(data.latest)
        setLatestPosts(data.latest)
      }
    }catch(error){
      console.log(error)
    }
  };

  React.useEffect(()=>{
    getLatestPosts()
  }, []);

  return (
    <CC
    loop
    autoplay
    autoplayDelay={10000}
    transition={"spring"}
    className="opacity-100 overflow-y-hidden"
    >
      {
        latestPosts?.map((item)=>(
          <div className="relative h-full w-full" key={item}>
          <Image
          priority
          fill
          src={item.image}
          alt={"alt"}
          className="h-screen w-full object-cover brightness-75"
          />
          <div className="absolute inset-0 grid h-full w-full items-center bg-black/30 pl-3">
            <div className={`w-3/4 md:w-2/4 text-left relative top-56`}>
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                {item.title}
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-2 xs:mb-6 opacity-80 text-md sm:text-xl"
              >
                {item.content}
              </Typography>
              <div className="">
                <Link href={`/post/${item.title}`}
                className="z-[100000] text-red-500"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
      </div>
        ))
      }
    </CC>
  );
};

export default Carousel;
