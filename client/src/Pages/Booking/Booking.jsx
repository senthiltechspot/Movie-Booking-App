import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTheatresById } from "../../API/Theaters.api";
import { getMovieById } from "../../API/Movies.api";
import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import "./Booking.css";
import Cinema from "../../Components/Cinema/Cinema";
import { createBooking } from "../../API/Booking.api";
import Payments from "../../Components/Payments/Payments";
const Booking = () => {
  const { movieId, theatreId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [theatresDetail, setTheatersDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const getTheareDetails = async () => {
    const theatresData = await getTheatresById(theatreId);
    setTheatersDetails(theatresData.data);
  };

  const getMovieDetails = async () => {
    const movieDetails = await getMovieById(movieId);
    setMovieDetails(movieDetails.data);
  };

  const init = async () => {
    await Promise.all([getTheareDetails(), getMovieDetails()]);
    setIsLoading(false);
  };

  useEffect(() => {
    init();// eslint-disable-next-line
  }, []);

  const proceedPayment = () => {
    setShowPaymentModal(true);
  };

  const closeModel = () => {
    setShowPaymentModal(false);
    setBookingDetails(null);
  };

  const confirmBooking = async () => {
    const data = {
      theatreId: theatreId,
      movieId: movieId,
      userId: localStorage.getItem("id"),
      noOfSeats: selectedSeats.length,
      totalCost: selectedSeats.length * movieDetails.price,
      timing: "EVENING",
    };

    const booking = await createBooking(data);

    // const payment = await makePayment();

    const paymentSuccess = true;

    if (paymentSuccess) {
      booking.data.status = "SUCCESS";
    } else {
      booking.data.status = "FAILED";
    }

    setBookingDetails(booking.data);
  };
  return (
    <div>
      {isLoading && (
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
      )}
      {!isLoading && (
        <div className="text-center bg-black fullView">
          <div className="">
            <h2 className="fw-bold text-light"> {movieDetails.name} </h2>

            <ShowCase />

            <Cinema
              movieDetails={movieDetails}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
            />

            <p className="info">
              You have selected{" "}
              <span className="count">{selectedSeats.length}</span> seats for
              the price of{" "}
              <span className="total">
                {selectedSeats.length * movieDetails.price} Rupees
              </span>
            </p>

            <Button onClick={proceedPayment} variant="contained" size="lg">
              Proceed To Payment
            </Button>
          </div>
        </div>
      )}
      {!isLoading && (
        <Payments
          show={showPaymentModal}
          closeModel={closeModel}
          setShow={setShowPaymentModal}
          theatresDetail={theatresDetail}
          movieDetails={movieDetails}
          selectedSeats={selectedSeats}
          confirmBooking={confirmBooking}
          bookingDetails={bookingDetails}
        />
      )}
    </div>
  );
};

function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>N/A</small>
      </li>
      <li>
        <span className="seat selected" /> <small>Selected</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>Occupied</small>
      </li>
    </ul>
  );
}

export default Booking;
