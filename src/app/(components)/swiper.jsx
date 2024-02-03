"use client"

import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';

// import { EffectCoverflow, Pagination, Navigation } from 'swiper';

const Swipe = () => {
  return (
    <div className="container">
      <h1 className="heading">Flower Gallery</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <img src={"/images/img_1.jpg"} alt="slide_image" className="w-72 object-cover object-center" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/images/img_2.jpg"} alt="slide_image" className="w-72 object-cover object-center" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/images/img_3.jpg"} alt="slide_image" className="w-72 object-cover object-center" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/images/img_4.jpg"} alt="slide_image" className="w-72 object-cover object-center" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/images/img_5.jpg"} alt="slide_image" className="w-72 object-cover object-center" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/images/img_6.jpg"} alt="slide_image" className="w-72 object-cover object-center" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/images/img_7.jpg"} alt="slide_image" className="w-72 object-cover object-center" />
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default Swipe