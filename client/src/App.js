import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Four0Four from "./Pages/Four0Four/Four0Four";
import Login from "./Pages/Auth/Login";
import MovieDetails from "./Pages/MovieDetails/MovieDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="*" element={<Four0Four />} />
        <Route exact path="/Details/:movieId" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
