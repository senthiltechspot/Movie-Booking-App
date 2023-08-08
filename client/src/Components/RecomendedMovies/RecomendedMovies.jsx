import React, { useEffect, useState } from "react";
import "./RecomendedMovies.css";
import { getAllMovies } from "../../API/Movies.api";
import { useNavigate } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";

const RecomendedMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(4); // State variable for slides per view

  const fetchMovies = async () => {
    try {
      const Moviedata = await getAllMovies();
      setMovies(Moviedata.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMovies();
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
    if (screenWidth < 768) {
      setSlidesPerView(3); // Set 3 slides per view for mobile screens
    } else {
      setSlidesPerView(4); // Set 4 slides per view for larger screens
    }
  };

  return (
    <div className="p-3">
      <h2>Recommended Movies</h2>
      <br />
      {!movies && (
        <div style={{ height: "10vh" }}>
          <Box className="d-flex flex-column justify-content-center align-items-center">
            <h4>Loading.... </h4>
          </Box>
          <LinearProgress />
        </div>
      )}
      <swiper-container
        class="mySwiper"
        navigation={slidesPerView === 3 ? "false" : "true"}
        slides-per-view={slidesPerView} // Use the state variable for slides per view
        space-between="10"
        autoplay-delay="2500"
        autoplay-disable-on-interaction="false"
      >
        {movies &&
          movies.map((item, i) => (
            <swiper-slide key={i}>
              <div
                className="movie-card"
                onClick={() => navigate(`/Details/${item._id}`)}
              >
                <img
                  src={item.posterUrl}
                  alt={item.name}
                  className="poster-img"
                />
                <div className="card-details">
                  <h4>{item.name}</h4>
                  <h6>{item.language}</h6>
                </div>
              </div>
            </swiper-slide>
          ))}
      </swiper-container>
    </div>
  );
};

export default RecomendedMovies;
