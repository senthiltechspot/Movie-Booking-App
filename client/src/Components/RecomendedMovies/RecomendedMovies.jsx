import React, { useEffect, useState } from "react";
import "./RecomendedMovies.css";
import { getAllMovies } from "../../API/Movies.api";
import { useNavigate } from "react-router-dom";
import { Box, Skeleton } from "@mui/material";

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
        <div>
          {/* <LinearProgress /> */}
          <swiper-container
            class="mySwiper"
            navigation={slidesPerView === 3 ? "false" : "true"}
            slides-per-view={slidesPerView} // Use the state variable for slides per view
            space-between="10"
            autoplay-delay="2500"
            autoplay-disable-on-interaction="false"
          >
            {Array.from({ length: slidesPerView }, (_, index) => (
              <swiper-slide key={index}>
                <div className="movie-card">
                  <Skeleton
                    variant="rectangular"
                    width={slidesPerView === 3 ? "100px" : "250px"}
                    height={slidesPerView === 3 ? "150px" : "300px"}
                    animation="wave"
                    className="rounded-3"
                  />
                  <Box
                    sx={
                      slidesPerView === 3
                        ? { width: "100px" }
                        : { width: "250px" }
                    }
                  >
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                  </Box>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
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
