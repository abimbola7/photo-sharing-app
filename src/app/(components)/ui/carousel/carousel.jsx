"use client"

import Image from 'next/image';
import React from 'react';
import { Button, Carousel as CC, Typography } from '@material-tailwind/react';

const Carousel = ({ posts }) => {
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
