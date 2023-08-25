import { useState } from "react";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-2">
        <div className="flex text-center">
          <div className="py-2 px-4">
            <label>Check in: </label>
            <input
              className="border rounded-xl px-1"
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-2 px-4 border-l">
            <label>Check out: </label>
            <input
              className="border rounded-xl px-1"
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-2 px-4 border-t">
          <label>Number of Guests: </label>
          <input
            className="text-center border rounded-2xl"
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
      </div>
      <button className="primary mt-4">Book this place</button>
    </div>
  );
}
