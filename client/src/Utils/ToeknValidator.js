import jwt_decode from "jwt-decode";

const validateToken = () => {
  try {
    let token = localStorage.getItem("token");
    // Verify the token
    const decodedToken = jwt_decode(token);

    // Check if the token has expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      return { valid: false, expired: true };
    }

    // Token is valid and not expired
    return { valid: true, expired: false };
  } catch (error) {
    // Token is invalid
    return { valid: false, expired: false };
  }
};

export default validateToken;
