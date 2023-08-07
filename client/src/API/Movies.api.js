import axios from "axios";
import { TOKEN } from "../Utils/constants";

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const getAllMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/mba/api/v1/movies`, {
      headers: {
        "x-access-token": localStorage.getItem(TOKEN),
      },
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getMovieById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/mba/api/v1/movies/${id}`, {
      headers: {
        "x-access-token": localStorage.getItem(TOKEN),
      },
    });

    return res;
  } catch (err) {
    // throw new Error("internal Error");
    console.log(err);
  }
};
