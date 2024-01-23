"use client"
import React, { useState, useEffect } from 'react';
import "./carousel.css"

const Carousel = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const [transitionClass, setTransitionClass] = useState('');

  const items = [
    { imgSrc: "images/img1.jpg", author: "ABIMBOLA", title: "DESIGN", topic: "ANIMAL", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit" },
    { imgSrc: "images/img2.jpg", author: "ABIMBOLA", title: "DESIGN dd", topic: "ANIMAL", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit" },
    { imgSrc: "images/img3.jpg", author: "ABIMBOLA", title: "DESIGN ddd", topic: "ANIMAL", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit" },
    { imgSrc: "images/img4.jpg", author: "ABIMBOLA", title: "DESIGN 3r" , topic: "ANIMAL", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit" },
    // Add other items...
  ];

  const handlePrevClick = () => {
    setCurrentItem((prevItem) => (prevItem === 0 ? items.length - 1 : prevItem - 1));
    setTransitionClass('prev');
  };

  const handleNextClick = () => {
    setCurrentItem((prevItem) => (prevItem === items.length - 1 ? 0 : prevItem + 1));
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
        {items.map((item, index) => (
          <div
            key={index}
            className="item"
            style={{ transform: `translateX(${100 * (index - currentItem)}%)` }}
          >
            <img src={item.imgSrc} alt={`Slide ${index + 1}`} className='!object-cover !w-full !h-screen'/>
            <div className="content">
              <div className="author">{item.author}</div>
              <div className="title">{item.title}</div>
              <div className="topic">{item.topic}</div>
              <div className="des">{item.description}</div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        ))} 
      </div>

      <div className={`thumbnail ${transitionClass}`}>
        {items.map((item, index) => (
          <div
            key={index}
            className="transition-transform duration-200 item"
            style={{ transform: `translateX(${10 * (index - currentItem)}%)` }}
          >
            <img src={items[(index + currentItem) % items.length].imgSrc} alt={`Thumbnail ${index + 1}`} />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="des">Description</div>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button id="prev" onClick={handlePrevClick}></button>
        <button id="next" onClick={handleNextClick}></button>
      </div>

      {/* <div className="time"></div> */}
    </div>
  );
};

export default Carousel;