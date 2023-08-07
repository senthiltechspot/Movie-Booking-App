import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTheatresForAMovie } from "../../API/Theaters.api";
import { getMovieById } from "../../API/Movies.api";
import { Box, Chip, CircularProgress, LinearProgress } from "@mui/material";

const MovieTheater = () => {
  const { movieId: selectedMovie } = useParams();
  const [theatresDetail, setTheatersDetails] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTheatres = async () => {
    const theatresData = await getTheatresForAMovie(selectedMovie);
    setTheatersDetails(theatresData.data);
  };

  const getMovieDetails = async () => {
    const movieDetails = await getMovieById(selectedMovie);
    setMovieDetails(movieDetails.data);
  };

  const init = async () => {
    await Promise.all([getTheatres(), getMovieDetails()]);
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []); // eslint-disable-line

  if (!isLoading) {
    return (
      <Box>
        <Box
          sx={{
            backgroundColor: "rgb(38,52, 72)",
            // height: "20vh",
            padding: "17px",
          }}
        >
          <h1 className="text">
            {movieDetails.name} - {movieDetails.language}
          </h1>
          <hr />
          <Box>
            <Chip label={"2D"} sx={{ color: "white" }} />
            <Chip label={movieDetails.language} sx={{ color: "white" }} />
          </Box>
          <hr />
          <h3 className="text">Directed By - {movieDetails.director}</h3>
        </Box>
        <Box className="container">
          {theatresDetail.length ? (
            theatresDetail.map((theatre, i) => (
              <Link
                to={`/buyTickets/${selectedMovie}/${theatre._id}`}
                className="text-decoration-none fw-bold "
                key={i}
              >
                <div
                  style={{ border: "1px solid grey", cursor: "pointer" }}
                  className="row py-4 mb-3"
                >
                  <div className="col">
                    <h5>{theatre.name}</h5>
                  </div>

                  <div className="col">
                    <div className="py-2 text-success fw-bold">
                      <i className="bi bi-phone text-success"></i>
                      m-Ticket
                    </div>
                  </div>

                  <div className="col">
                    <div className="py-2 text-danger fw-bold">
                      <i className="bi bi-cup-straw text-danger"></i>
                      Food And Beverages
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <>
              <div>
                <Box
                  className="d-flex justify-content-center align-items-center"
                  sx={{ height: "50vh", border: "1px solid grey" }}
                >
                  Sorry! No Theater Available Right Now
                </Box>
              </div>
            </>
          )}
        </Box>
      </Box>
    );
  } else {
    return (
      <div>
        <LinearProgress />
        <Box
          className="d-flex flex-column justify-content-center align-items-center"
          sx={{ height: "80vh" }}
        >
          <CircularProgress />
          <h4>Loading.... Please Wait</h4>
        </Box>
      </div>
    );
  }
};

export default MovieTheater;
