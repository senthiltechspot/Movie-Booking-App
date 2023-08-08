import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllBookings } from "../../API/Booking.api";
import "./Orders.css";
const Orders = () => {
  const isMobile = window.innerWidth <= 768;
  const [Bookings, setBookings] = useState(null);

  const fetchBookings = async () => {
    const bookingdata = await getAllBookings();
    setBookings(bookingdata.data);
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  console.log(Bookings);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgb(38,52, 72)",
          padding: "17px",
        }}
      >
        <h1 className="text">Your Orders</h1>
      </Box>
      {!Bookings && (
        <>
          <LinearProgress />
          <Box
            className="d-flex flex-column justify-content-center align-items-center"
            sx={{ height: "80vh" }}
          >
            <CircularProgress />
            <h4>Loading Your Orders</h4>
          </Box>
        </>
      )}
      <Box className="d-flex flex-column align-items-center justify-content-center p-4 gap-3">
        {Bookings &&
          Bookings.map((item, i) => (
            <Card
              className="d-flex align-items-center flex-wrap"
              sx={{ width: "80vw", border: "1px solid black" }}
              key={i}
            >
              <CardMedia
                className="d-flex align-items-center justify-content-center gap-3 cardMedia-poster"
                sx={{
                  padding: "1em 1em 1em 1em",
                  objectFit: "contain",
                  width: isMobile ? "100%" : "20vw",
                }}
                component="img"
                alt={item.movieId.name}
                // height="150px" // Adjust this height as needed
                // width="100px"
                height="250"
                image={item.movieId.posterUrl}
              />
              <CardContent
                className="d-flex flex-column justify-content-center p-4"
                // sx={{ flexGrow: 1 }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  {item.movieId.name} - {item.movieId.language}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.theatreId.name} - {item.theatreId.city} - {item.timing}{" "}
                  - {item.timing}
                </Typography>
                <Box>
                  <Typography gutterBottom variant="h8">
                    Total Qty - {item.noOfSeats}
                  </Typography>
                  <Typography gutterBottom variant="h8" component="h6">
                    Total Price - {item.totalCost}
                  </Typography>
                  <Typography gutterBottom variant="h8">
                    Order Id - {item._id}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions
                className="d-flex align-items-center  justify-content-center flex-wrap gap-3 pb-3"
                sx={isMobile && { width: "100%" }}
              >
                <Chip label={item.status} color="success" />
                {/* <Button size="small">{item.status}</Button> */}
                <Button size="small" variant="contained" color="error">
                  Cancel
                </Button>
              </CardActions>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default Orders;
