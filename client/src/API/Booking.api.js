import axios from "axios";
import { TOKEN } from "../Utils/constants";

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const getAllBookings = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/mba/api/v1/bookings`, {
      headers: {
        "x-access-token": localStorage.getItem(TOKEN),
      },
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createBooking = async (bookingRequest) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/mba/api/v1/bookings`,
      bookingRequest,
      {
        headers: {
          "x-access-token": localStorage.getItem(TOKEN),
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const cancelBooking = async (id) => {
  const headers = {
    "x-access-token": localStorage.getItem(TOKEN),
  };

  try {
    const res = await axios.put(
      `${BASE_URL}/mba/api/v1/bookings/${id}/cancel`,
      {},
      {
        headers: headers,
      }
    );
    return res;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error; // Rethrow the error to the caller
  }
};
