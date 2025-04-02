import { useDispatch, useSelector } from "react-redux";
import useUnbookedGuest from "../hooks/useUnbookedGuest.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { addSelectedGuest } from "../utils/clientSlice.js";
import useBookedGuest from "../hooks/useBookedGuests.js";

const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   useUnbookedGuest();
   useBookedGuest();
  const bookedGuest = useSelector((store)=>store.client.bookedGuest); 
  const guestList = useSelector((store) => store.client.unBookedGuest);
  console.log("unbooked", guestList)
  
  const handleTravelBookGuest = (guest) => {
    dispatch(addSelectedGuest(guest)); 
    navigate("/client/travelAgency");  
  };
  const handleAccommodationBookGuest = (guest) =>{
    dispatch(addSelectedGuest(guest));
    navigate("/client/accommodation")
  }
  return (
    <div className="bg-gray-100 p-5">
      <h1 className="font-bold text-2xl text-gray-600 m-2 text-center">Booked Guests</h1>
      <table className="min-w-full bg-gray-200 rounded-lg shadow-md justify-center">
          <thead>
            <tr className="bg-gray-300 text-center">
              <th className="px-4 py-2 font-bold">S.no.</th>
              <th className="px-4 py-2 font-bold">Name</th>
              <th className="px-4 py-2 font-bold">Travel Agency</th>
              <th className="px-4 py-2 font-bold">Approval Status</th>
              <th className="px-4 py-2 font-bold">Accommodation</th>
              <th className="px-4 py-2 font-bold">Approval Status</th>
            </tr>
          </thead>
          <tbody>
            {bookedGuest.length > 0 ? (
              bookedGuest.map((guest, index) => (
                <tr key={guest?._id || index} className="text-center">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{guest?.guest?.name || "N/A"}</td>
                  <td className="px-4 py-2">{guest?.travelAgency?.name || "N/A"}</td>
                  <td className="px-4 py-2">{guest?.travelApprovalStatus}</td>
                  <td className="px-4 py-2">{guest?.accommodation?.name || "N/A"}</td>
                  <td className="px-4 py-2">{guest?.accommodationApprovalStatus }</td>
                </tr>
              ))
              
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                  No booked guests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      <h1 className="font-bold text-2xl text-gray-600 m-2 text-center">Guests to be Booked</h1>
      <div className="overflow-x-auto flex">
        <table className="min-w-full bg-gray-200 rounded-lg shadow-md justify-center">
          <thead>
            <tr className="bg-gray-300 text-center">
              <th className="px-4 py-2 font-bold">S.no.</th>
              <th className="px-4 py-2 font-bold">Name</th>
              <th className="px-4 py-2 font-bold">Arrival</th>
              <th className="px-4 py-2">Arrival Time</th>
              <th className="px-4 py-2">Stay Days</th>
              <th className="px-4 py-2 font-bold">Travel</th>
              <th className="px-4 py-2 font-bold">Stay</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {guestList ? (
              guestList.map((guest, index) => (
                <tr key={guest._id || index} className="text-center">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{guest.name}</td>
                  <td className="px-4 py-2">{new Date(guest.departure_date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{guest.departure_time}</td>
                  <td className="px-4 py-2">{guest.accommodation_days}</td>
                  <td className="px-4 py-2 text-right">
                  <button 
                  className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleTravelBookGuest(guest)}>Book</button>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleAccommodationBookGuest(guest)}>Book</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                  No unbooked guests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
