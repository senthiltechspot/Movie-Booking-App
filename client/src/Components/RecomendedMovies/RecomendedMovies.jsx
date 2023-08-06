import React from "react";
import "./RecomendedMovies.css";
const RecomendedMovies = () => {
  let movies = [
    {
      name: "Jailer",
      type: "Comedy",
      likes: "12k",
      rating: "8/10",
      imgurl:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-MjMzLjlLIExpa2Vz,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00331686-cbuauubbzu-portrait.jpg",
    },
    {
      name: "Jailer1",
      type: "Comedy",
      likes: "12k",
      rating: "8/10",
      imgurl:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-MjMzLjlLIExpa2Vz,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00331686-cbuauubbzu-portrait.jpg",
    },
    {
      name: "Jailer2",
      type: "Comedy",
      likes: "12k",
      rating: "8/10",
      imgurl:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-MjMzLjlLIExpa2Vz,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00331686-cbuauubbzu-portrait.jpg",
    },
    {
      name: "Jailer3",
      type: "Comedy",
      likes: "12k",
      rating: "8/10",
      imgurl:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-MjMzLjlLIExpa2Vz,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00331686-cbuauubbzu-portrait.jpg",
    },
    {
      name: "Jailer4",
      type: "Comedy",
      likes: "12k",
      rating: "8/10",
      imgurl:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-MjMzLjlLIExpa2Vz,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00331686-cbuauubbzu-portrait.jpg",
    },
    {
      name: "Jailer5",
      type: "Comedy",
      likes: "12k",
      rating: "8/10",
      imgurl:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-MjMzLjlLIExpa2Vz,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00331686-cbuauubbzu-portrait.jpg",
    },
    {
      name: "Jailer6",
      type: "Comedy",
      likes: "12k",
      rating: "8/10",
      imgurl:
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-MjMzLjlLIExpa2Vz,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00331686-cbuauubbzu-portrait.jpg",
    },
  ];
  return (
    <div className="container">
      <h2>Recommeded Movies</h2>
      <br/>
      <swiper-container
        class="mySwiper"
        navigation="true"
        // pagination="true"
        // pagination-clickable="true"
        slides-per-view="4"
        space-between="30"
        autoplay-delay="2500"
        autoplay-disable-on-interaction="false"
        // loop="true"
      >
        {movies.map((item) => (
          <swiper-slide>
            <div className="movie-card">
              <img src={item.imgurl} alt={item.name} />
              <div className="card-details">
                <h4>{item.name}</h4>
                <h7>{item.type}</h7>
              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default RecomendedMovies;
