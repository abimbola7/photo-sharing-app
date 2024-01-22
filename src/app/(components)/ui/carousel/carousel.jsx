"use client"

import React, { useState, useEffect } from 'react';
import "./carousel.css"


const Carousel = () => {
  
  return (
    <div className="carousel">
    <div className="list">
      <div className="item">
        <img src="./images/img1.jpg" />
        <div className="content">
          <div className="author">ABIMBOLA</div>
          <div className="title">DESIGN SLIDER</div>
          <div className="topic">ANIMAL</div>
          <div className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
          <div className="buttons">
            <button>SEE MORE</button>
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>
      <div className="item">
        <img src="./images/img2.jpg" />
        <div className="content">
          <div className="author">ABIMBOLA</div>
          <div className="title">DESIGN SLIDER</div>
          <div className="topic">ANIMAL</div>
          <div className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
          <div className="buttons">
            <button>SEE MORE</button>
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>
      <div className="item">
        <img src="./images/img3.jpg" />
        <div className="content">
          <div className="author">ABIMBOLA</div>
          <div className="title">DESIGN SLIDER</div>
          <div className="topic">ANIMAL</div>
          <div className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
          <div className="buttons">
            <button>SEE MORE</button>
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>
      <div className="item">
        <img src="./images/img4.jpg" />
        <div className="content">
          <div className="author">ABIMBOLA</div>
          <div className="title">DESIGN SLIDER</div>
          <div className="topic">ANIMAL</div>
          <div className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
          <div className="buttons">
            <button>SEE MORE</button>
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>
    </div>

    <div className="thumbnail">
      <div className="item">
        <img src="images/img1.jpg"/>
        <div className="content">
          <div className="title">
            Name Slider
          </div>
          <div className="des">
            Description
          </div>
        </div>
      </div>
      <div className="item">
        <img src="images/img2.jpg"/>
        <div className="content">
          <div className="title">
            Name Slider
          </div>
          <div className="des">
            Description
          </div>
        </div>
      </div>
      <div className="item">
        <img src="images/img3.jpg"/>
        <div className="content">
          <div className="title">
            Name Slider
          </div>
          <div className="des">
            Description
          </div>
        </div>
      </div>
      <div className="item">
        <img src="images/img4.jpg"/>
        <div className="content">
          <div className="title">
            Name Slider
          </div>
          <div className="des">
            Description
          </div>
        </div>
      </div>
    </div>

    <div className="arrows">
      <button id="prev"></button>
      <button id="next"></button>
    </div>

    <div className="time">

    </div>
  </div>
  );
};

export default Carousel;

