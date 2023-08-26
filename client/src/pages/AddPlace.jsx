import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Amenities from "../Amenities";
import AccountNav from "../AccountNav";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function AddPlace() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("00:00");
  const [checkOut, setCheckOut] = useState("00:00");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setUploadedPhotos(data.photos);
      setDescription(data.description);
      setAmenities(data.amenities);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      uploadedPhotos,
      description,
      amenities,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      //update place
      try {
        await axios.put("/places", {
          id,
          ...placeData,
        });
        alert("Edit Succesful.");
        setRedirect(true);
      } catch (e) {
        alert("Edit Unsuccesful. Please try again later.");
      }
    } else {
      //new place
      try {
        await axios.post("/places", placeData);
        alert("New Property Added.");
        setRedirect(true);
      } catch (e) {
        alert("Add property failed. Please try again later.");
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {inputHeader("Title")}
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
        <PhotosUploader
          uploadedPhotos={uploadedPhotos}
          onChange={setUploadedPhotos}
        />
        {inputHeader("Description")}
        <textarea
          placeholder="Description of your property"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {inputHeader("Amenities")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Amenities selected={amenities} onChange={setAmenities} />
        </div>
        {inputHeader("Extra Info")}
        <textarea
          placeholder="House Rules, etc."
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {inputHeader("Check in & Check out, Max Guests")}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 mb-1">Check in</h3>
            <input
              className="border rounded-full px-2"
              type="time"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Check out</h3>
            <input
              className="border rounded-full px-2"
              type="time"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Max guests</h3>
            <input
              className="border rounded-full text-center"
              type="number"
              min="1"
              max="10"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(Number(ev.target.value))}
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Price per night</h3>
            <input
              className="border rounded-full text-center"
              type="number"
              min="1"
              value={price}
              onChange={(ev) => setPrice(Number(ev.target.value))}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
