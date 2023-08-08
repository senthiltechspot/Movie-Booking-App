import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Four0Four from "./Pages/Four0Four/Four0Four";
import Login from "./Pages/Auth/Login";
import MovieDetails from "./Pages/MovieDetails/MovieDetails";
import Footer from "./Components/Footer/Footer";
import MovieTheater from "./Pages/MovieTheater/MovieTheater";
import Booking from "./Pages/Booking/Booking";
import Orders from "./Pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateToken from "./Utils/ToeknValidator";

function App() {
  const { valid, expired } = validateToken();
  const ProtectedRoute = ({ children }) => {
    if (valid === false && (expired === false || true)) {
      return <Navigate to={`/login`} replace />;
    }
    return children;
  };
  return (
    <Router>
      <ToastContainer
        autoClose={3000}
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="*" element={<Four0Four />} />
        <Route exact path="/Details/:movieId" element={<MovieDetails />} />
        <Route exact path="/BuyTickets/:movieId" element={<MovieTheater />} />
        <Route
          exact
          path="/buyTickets/:movieId/:theatreId"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/Orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
