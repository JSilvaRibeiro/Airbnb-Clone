import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Amentities from "../amentities";
import axios from "axios";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [amentities, setAmentities] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filename } = response;
        setUploadedPhotos((prev) => {
          return [...prev, filename];
        });
      });
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
            {inputHeader("Title")}
            {/* <h2 className="text-2xl mt-4">Title</h2> */}
            <input
              type="text"
              placeholder="Title, ie. 'My lovely apartment' "
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            {inputHeader("Address")}
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />
            {inputHeader("Add Photos")}
            {/* <div className="flex gap-2 my-2">
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;Photo
              </button>
            </div> */}
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <label className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div>
            {inputHeader("Description")}
            <textarea
              placeholder="Description of your property"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            {inputHeader("Amentities")}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Amentities selected={amentities} onChange={setAmentities} />
            </div>
            {inputHeader("Extra Info")}
            <textarea
              placeholder="House Rules, etc."
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            {inputHeader("Check in & Check out, Max Guests")}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 mb-1">Check in</h3>
                <input
                  className="border rounded-full px-2"
                  type="date"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 mb-1">Check out</h3>
                <input
                  className="border rounded-full px-2"
                  type="date"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 mb-1">Max guests</h3>
                <input
                  className="border"
                  type="number"
                  min="1"
                  max="10"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(Number(ev.target.value))}
                />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
