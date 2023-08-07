import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Payments({
  show,
  setShow,
  theatresDetail,
  movieDetails,
  selectedSeats,
  confirmBooking,
  bookingDetails,
  closeModel,
}) {
  const handleClose = closeModel;

  return (
    <Modal
      open={show}
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
            Order Summary
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
        <Box className="row">
          {movieDetails && (
            <Box className="col my-2">
              <h5> {movieDetails.name}</h5>
              <p> {movieDetails.language} </p>
              <p className="fw-bolder"> {theatresDetail.name} </p>
            </Box>
          )}

          <Box className="col-5">
            <h5> {selectedSeats.length} Tickets </h5>
            <br />
            <br/>
            <p className="text-success"> m-Ticket </p>
          </Box>
        </Box>
        <hr />
        <div className="row">
          <div className="col">
            <p> Total </p>
          </div>

          <div className="col-3">
            <p> Rs {movieDetails.price * selectedSeats.length} </p>
          </div>
        </div>
        <hr />
        {bookingDetails && (
          <div>
            {bookingDetails.status === "SUCCESS" ? (
              <div className="d-flex flex-column justify-content-between align-items-center">
                <img
                  src={movieDetails.posterUrl}
                  alt="Poster"
                  height={100}
                  width={100}
                />

                <h5> Booking Confirmed !</h5>
                <small> Booking Id : </small>
                <p className="fw-bolder"> {bookingDetails._id} </p>

                <Link to="/">
                  <p> Go to Landing Page </p>
                </Link>
              </div>
            ) : (
              <div className="d-flex flex-column justify-content-between align-items-center">
                <img
                  src={movieDetails.posterUrl}
                  alt="Poster"
                  height={100}
                  width={100}
                />

                <h5> Booking Failed !</h5>
                <small>Please Retry </small>
              </div>
            )}
          </div>
        )}
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
        {"   "}
        {!bookingDetails && (
          <Button variant="contained" onClick={confirmBooking}>
            Confirm Paymemt
          </Button>
        )}
      </Box>
    </Modal>
  );
}

export default Payments;
