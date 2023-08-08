import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams,useNavigate } from "react-router-dom";
import { getMovieById } from "../../API/Movies.api";
import "./MovieDetails.css";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MovieDetails = () => {
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchMovieDetails = async () => {
    const movieDetails = await getMovieById(movieId);
    setMovieDetails(movieDetails.data);
  };

  useEffect(() => {
    fetchMovieDetails(); // eslint-disable-next-line
  }, []);
  return (
    <Box>
      {movieDetails ? (
        <Box className="d-flex align-items-center flex-wrap gap-5 MovieDetails-Card">
          <Box className="Detailsposter-img">
            <img src={movieDetails.posterUrl} alt={movieDetails.name} />
          </Box>
          <Box className="card-details d-flex flex-column justify-content-center gap-3">
            <h1 className="text">{movieDetails.name}</h1>

            <Box>
              <Chip label={"2D"} sx={{ color: "white" }} />

              <Chip label={movieDetails.language} sx={{ color: "white" }} />
            </Box>
            <h4 className="text">
              2h 43m • Action • UA • {movieDetails.releaseDate}
            </h4>
            <h6 className="text">{movieDetails.language}</h6>
            <Box className="d-flex gap-4">
              <Button
                sx={{ backgroundColor: "rgb(248, 68, 100)" }}
                variant="contained"
                onClick={() => {navigate(`/BuyTickets/${movieDetails._id}`)}}
              >
                Book Tickets
              </Button>
              <Button
                sx={{ backgroundColor: " rgb(74,73,97);" }}
                variant="contained"
                onClick={handleOpen}
              >
                View Trailer
              </Button>
            </Box>
          </Box>
          <Box>
            <h4 className="text">About</h4>
            <h6 className="text">{movieDetails.description}</h6>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box className="d-flex align-items-center">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                >
                  {movieDetails.name} Trailer
                </Typography>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2, ml: 2 }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <br />
              <Box className="d-flex flex-column justify-content-center align-items-center bg-dark">
                <ReactPlayer
                  url={movieDetails.trailerUrl}
                  controls={true}
                  width="100%"
                  height="70vh"
                />
              </Box>
            </Box>
          </Modal>
        </Box>
      ) : (
        <>
          <LinearProgress />
          <Box
            className="d-flex flex-column justify-content-center align-items-center"
            sx={{ height: "80vh" }}
          >
            <CircularProgress />
            <h4>Loading.... Please Wait</h4>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MovieDetails;
