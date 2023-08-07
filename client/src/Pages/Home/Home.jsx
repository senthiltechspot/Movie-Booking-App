import React from "react";
import BannerCarousel from "../../Components/BannerCarousel/BannerCarousel";
import RecomendedMovies from "../../Components/RecomendedMovies/RecomendedMovies";
import ad from "../../Assets/ad.avif";
import "./Home.css";
import Events from "../../Components/Events/Events";
const Home = () => {
  return (
    <div>
      <BannerCarousel />
      <RecomendedMovies />
      <div className="ad">
        <img src={ad} alt="ad-img" className="ad-img" />
      </div>
      <Events />
    </div>
  );
};

export default Home;
