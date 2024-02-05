"use client"
import React, { useState, useEffect } from 'react';
import "./carousel.css"
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

const Carousel = ({ posts }) => {
  console.log(posts)
  const [currentItem, setCurrentItem] = useState(0);
  const [transitionClass, setTransitionClass] = useState('');

  const handlePrevClick = () => {
    setCurrentItem((prevItem) => (prevItem === 0 ? posts.length - 1 : prevItem - 1));
    setTransitionClass('prev');
  };

  const handleNextClick = () => {
    setCurrentItem((prevItem) => (prevItem === posts.length - 1 ? 0 : prevItem + 1));
    setTransitionClass('next');
  };

  useEffect(() => {
    const runAutoRun = setTimeout(() => {
      handleNextClick();
    }, 7000);

    return () => clearTimeout(runAutoRun);
  }, [currentItem]);

  const handleTransitionEnd = () => {
    setTransitionClass(''); // Remove the "prev" or "next" class after the transition ends
  };

  return (
    <div className="carousel" onTransitionEnd={handleTransitionEnd}>
      <div className={`list ${transitionClass}`}>
        {posts.map((item, index) => (
          <div
            key={index}
            className="item"
            style={{ transform: `translateX(${100 * (index - currentItem)}%)` }}
          >
            <Image
            quality={20}
            priority
            width={1000}
            height={1000}
            placeholder='blur'
            blurDataURL='/loader.svg' 
            src={item.image} 
            alt={`Slide ${index + 1}`} 
            className='!object-cover !w-full !h-screen'/>
            <div className="content">
              <div className="author">{item.author.username}</div>
              <div className="title">{item.title}</div>
              <div className="topic">{item.content}</div>
              {/* <div className="des">{item.description}</div> */}
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        ))} 
      </div>

      <div className={`thumbnail ${transitionClass}`}>
        {posts.map((item, index) => (
          <div
            key={index}
            className="transition-transform duration-200 item"
            style={{ transform: `translateX(${20 * (index - currentItem)}%)` }}
          >
            <Image
            quality="10"
            width={100}
            height={100}
            placeholder='blur'
            blurDataURL='/loading.svg'
            src={posts[(index + currentItem) % posts.length].image} 
            alt={`Thumbnail ${index + 1}`} 
            />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="des">Description</div>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button id="prev" onClick={handlePrevClick} className="flex items-center justify-center">
          <ChevronLeftIcon  className="w-8 h-8"/>
        </button>
        <button id="next" onClick={handleNextClick} className="flex items-center justify-center">
          <ChevronRightIcon  className="w-8 h-8"/>
        </button>
      </div>
    </div>
  );
};

export default Carousel;