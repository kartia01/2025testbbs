import React from 'react'
import "../App.css";
import "../swiper-bundle.min.css";
import "../../swiper-bundle.min.js";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


function HomeComp() {
  return (
    <div>
      <h3>HomeComp</h3>
      <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            style={{ height: "400px" }}
          >
            <SwiperSlide className="d-flex justify-content-center align-item-center">
              Slide 1
            </SwiperSlide>
            <SwiperSlide className="d-flex justify-content-center align-item-center">
              Slide 2
            </SwiperSlide>
            <SwiperSlide className="d-flex justify-content-center align-item-center">
              Slide 3
            </SwiperSlide>
            <SwiperSlide className="d-flex justify-content-center align-item-center">
              Slide 4
            </SwiperSlide>
            <SwiperSlide className="d-flex justify-content-center align-item-center">
              Slide 5
            </SwiperSlide>
          </Swiper>
    </div>
  )
}

export default HomeComp