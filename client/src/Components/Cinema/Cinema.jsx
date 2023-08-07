// import { useState } from "react";
import clsx from "clsx";

const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

function Cinema({ movieDetails, selectedSeats, setSelectedSeats }) {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);

    if (isSelected) {
      const updatedSeats = selectedSeats.filter(
        (selectedSeat) => selectedSeat !== seat
      );
      setSelectedSeats(updatedSeats);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  }

  return (
    <div className="Cinema">
      <div className="screen" />

      <div className="seats">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = movieDetails.occupiedSeats.includes(seat);
          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                "seat",
                isSelected && "selected",
                isOccupied && "occupied"
              )}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
            //   onKeyPress={
            //     isOccupied
            //       ? null
            //       : (e) => {
            //           if (e.key === "Enter") {
            //             handleSelectedState(seat);
            //           }
            //         }
            //   }
            />
          );
        })}
      </div>
    </div>
  );
}

export default Cinema;
