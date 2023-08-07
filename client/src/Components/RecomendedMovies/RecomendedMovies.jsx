import React, { useEffect, useState } from "react";
import "./RecomendedMovies.css";
import { getAllMovies } from "../../API/Movies.api";
import { useNavigate } from "react-router-dom";
const RecomendedMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState(null);

  const fetchMovies = async () => {
    try {
      const Moviedata = await getAllMovies();
      console.log(Moviedata);
      setMovies(Moviedata.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="container">
      <h2>Recommeded Movies</h2>
      <br />
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
        {movies &&
          movies.map((item) => (
            <swiper-slide>
              <div className="movie-card" onClick={()=>navigate(`/Details/${item._id}`)}>
                <img
                  src={item.posterUrl}
                  alt={item.name}
                  className="poster-img"
                />
                <div className="card-details">
                  <h4>{item.name}</h4>
                  <h7>{item.language}</h7>
                </div>
              </div>
            </swiper-slide>
          ))}
      </swiper-container>
    </div>
  );
};

export default RecomendedMovies;
