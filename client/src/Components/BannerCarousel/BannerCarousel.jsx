import React from "react";
import "./BannerCarousel.css";

const BannerCarousel = () => {
  return (
    <swiper-container
      class="mySwiper"
      pagination="true"
      pagination-clickable="true"
      navigation="true"
      space-between="30"
      centered-slides="true"
      autoplay-delay="2500"
      autoplay-disable-on-interaction="false"
      loop="true"
    >
      <swiper-slide>
        <img
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1691140438624_freeaccesdesktopaug.jpg"
          alt="banner"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="https://mbafrontend.onrender.com/static/media/1.f2933d1c1eebe6fa3779.avif"
          alt="banner"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="https://mbafrontend.onrender.com/static/media/2.384133e668153cd36e31.avif"
          alt="banner"
        />
      </swiper-slide>
    </swiper-container>
  );
};

export default BannerCarousel;
