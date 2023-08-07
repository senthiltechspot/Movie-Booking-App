import { Link } from "react-router-dom";

function TheatreComponent(theatre, selectedMovie) {
  return (
    <>
      <Link
        to={`/buyTickets/${selectedMovie}/${theatre._id}`}
        className="text-decoration-none fw-bold"
      >
        <div
          style={{ border: "1px solid grey", cursor: "pointer" }}
          className="row py-4"
        >
          <div className="col">
            <h5>{theatre.name}</h5>
          </div>

          <div className="col">
            <div className="py-2 text-success fw-bold">
              <i className="bi bi-phone text-success"></i>
              m-Ticket
            </div>
          </div>

          <div className="col">
            <div className="py-2 text-danger fw-bold">
              <i className="bi bi-cup-straw text-danger"></i>
              Food And Beverages
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

function TheatreDetails({ theatresDetail, selectedMovie }) {
  return (
    <div>
      {theatresDetail.map((theatre) =>
        TheatreComponent(theatre, selectedMovie)
      )}
    </div>
  );
}

export default TheatreDetails;
