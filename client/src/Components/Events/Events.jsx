import React, { useState, useEffect } from "react";
import workshop from "../../Assets/Events/workshop.avif";
import kids from "../../Assets/Events/kids.avif";
import comedy from "../../Assets/Events/comedy.avif";
import music from "../../Assets/Events/music.avif";

const Events = () => {
  let events = [
    {
      name: "wokshop",
      imgurl: workshop,
    },
    {
      name: "kids",
      imgurl: kids,
    },
    {
      name: "comedy",
      imgurl: comedy,
    },
    {
      name: "music",
      imgurl: music,
    },
  ];
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    // Add event listener to handle window resize
    window.addEventListener("resize", handleWindowResize);
    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // Function to handle window resize
  const handleWindowResize = () => {
    // Update slides per view based on screen width
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setSlidesPerView(1);
    } else {
      setSlidesPerView(4);
    }
  };
  return (
    <div className="container">
      <swiper-container
        class="mySwiper"
        // navigation="true"
        // pagination="true"
        // pagination-clickable="true"
        slides-per-view={slidesPerView}
        space-between="20"
        autoplay-delay="2500"
        autoplay-disable-on-interaction="false"
        // loop="true"
      >
        {events.map((item) => (
          <swiper-slide>
            <div className="movie-card">
              <img src={item.imgurl} alt={item.name} />
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default Events;
