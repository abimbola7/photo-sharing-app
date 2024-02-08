"use client"

import Image from 'next/image';
import React from 'react';
import { Button, Carousel as CC, Typography } from '@material-tailwind/react';
import Framer from '@/app/(providers)/framer';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Carousel = ({ posts }) => {
  console.log(posts)
  const images = [
    { id: 1, url: 'https://firebasestorage.googleapis.com/v0/b/photo-sharing-e8864.appspot.com/o/posts%2Ffb48e2e2-7a80-4607-9dc5-08b3a80d070a%2Fimages?alt=media&token=17bf461f-5b2d-41a4-99ca-2e1166ddb944', title: 'Image 1' },
    { id: 2, url: 'https://firebasestorage.googleapis.com/v0/b/photo-sharing-e8864.appspot.com/o/posts%2F2ab1bc43-4a6b-4ba2-870b-2a9e9736a704%2Fimages?alt=media&token=bae58387-30c5-44d0-a9b8-9b5aeaa3fe85', title: 'Image 2' },
    { id: 3, url: 'https://firebasestorage.googleapis.com/v0/b/photo-sharing-e8864.appspot.com/o/posts%2F6dee72b0-d33b-49d0-bd9d-8b70ffa99f2b%2Fimages?alt=media&token=3d1e48ef-7ba7-45b8-877e-2b2262d8139d', title: 'Image 3' },
    { id: 4, url: 'https://firebasestorage.googleapis.com/v0/b/photo-sharing-e8864.appspot.com/o/posts%2F9e095c08-eeae-4246-90e1-8b724daded3d%2Fimages?alt=media&token=6f68fe87-0973-4be9-ad3f-cc60c88e5185', title: 'Image 4' },
    // Add more images as needed
  ];
  
  return (
    <CC
    loop
    autoplay
    autoplayDelay={10000}
    transition={"spring"}
    className="opacity-100 overflow-y-hidden"
    >
      {
        posts.map((item)=>(
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
                <Button
                className="z-[100000] text-destructive"
                >
                  Read More
                </Button>
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
