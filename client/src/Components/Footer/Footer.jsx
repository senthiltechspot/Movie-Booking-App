import React from "react";

const Footer = () => {
  const isMobile = window.innerWidth <= 768;
  return (
    <footer
      className="d-flex justify-content-center p-3"
      style={{ backgroundColor: "rgb(43, 49, 72)" }}
    >
      <h6 className="text" style={{ fontSize: isMobile ? "10px" : "16px" }}>
        © Designed and Developed by
        <a href="https://github.com/SenthilTechSpot"> SenthilTechSpot</a>
      </h6>
    </footer>
  );
};

export default Footer;
