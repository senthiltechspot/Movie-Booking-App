import React, { useEffect } from "react";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import validateToken from "../../Utils/ToeknValidator";
import { Box, CircularProgress, LinearProgress } from "@mui/material";

const Login = () => {
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    handleScrollToTop();
    // Get the token from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      // Save the token to localStorage
      localStorage.setItem("token", token);
      const decodedToken = jwt_decode(token);
      localStorage.setItem("name", decodedToken.name);
      localStorage.setItem("username", decodedToken.username);
      localStorage.setItem("email", decodedToken.email);
      localStorage.setItem("userType", decodedToken.userType);
      toast.success("Login Sucess");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      const { valid, expired } = validateToken();
      if (valid === true && expired === false) {
        window.location.href = "/";
      } else {
        window.location.href = `${process.env.REACT_APP_BACKEND_API}/mba/api/v1/login/google`;
      }
    }
    // Redirect to another page or perform any other actions
    // history.push("/dashboard");
  }, []);

  return (
    <div>
      <LinearProgress />
      <Box
        className="d-flex flex-column justify-content-center align-items-center"
        sx={{ height: "80vh" }}
      >
        <CircularProgress />
        Logging You In.... Please Wait
      </Box>
    </div>
  );
};

export default Login;
