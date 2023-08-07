import React from "react";
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
  return (
    <div className="container">
      <swiper-container
        class="mySwiper"
        navigation="true"
        slides-per-view="4"
        space-between="30"
      >
        {events.map((item, i) => (
          <swiper-slide key={i}>
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
