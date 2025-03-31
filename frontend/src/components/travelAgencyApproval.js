import { useNavigate, useSearchParams } from "react-router-dom";
import useBookingDetails from "../hooks/useBookingDetails.js";
import { useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const TravelAgencyApproval = ()=>{
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    console.log("Extracted Booking ID:", bookingId);
    useBookingDetails(bookingId);
    const booking = useSelector((store)=>store?.client?.selectedBooking)
    console.log(booking)
    const [approved, setApproved] = useState(false);
    const handleApprovalChange = async (e) => {
      e.preventDefault(); // Prevent form submission refresh
  
      try {
          const response = await axios.post(
              `/api/v1/booking/travelApproval?bookingId=${bookingId}`, 
              { approved }, 
              { withCredentials: true }
          );
          console.log(response)
          toast.success(response.data.message);
  
          navigate('/login'); 
      } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
      }
  };
  
    return <>
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-5">
      <h2 className="text-xl font-bold text-center mb-4">Booking Invoice</h2>
      <div className="border-b pb-2 mb-2">
        <p><strong>Guest Name:</strong> {booking?.guest?.name || "N/A"}</p>
        <p><strong>Email:</strong> {booking?.guest?.email || "N/A"}</p>
        <p><strong>Phone Number:</strong> {booking?.guest?.phoneNumber || "N/A"}</p>
      </div>
      <div className="border-b pb-2 mb-2">
        <p><strong>Travel Agency:</strong> {booking?.travelAgency?.name || "N/A"}</p>
      </div>
      <div className="border-b pb-2 mb-2">
        <p><strong>Arrival Date:</strong> {new Date(booking?.travelDetails?.arrivalDate).toLocaleDateString() || "N/A"}</p>
        <p><strong>Departure Date:</strong> {new Date(booking?.travelDetails?.departureDate).toLocaleDateString() || "N/A"}</p>
        <p><strong>Travel Preference:</strong> {booking?.travelDetails?.preference || "N/A"}</p>
        <p><strong>Venue:</strong> {booking?.travelDetails?.venue || "N/A"}</p>
        <p><strong>Budget:</strong> Rs.{booking?.travelDetails?.budget || 0}</p>
      </div>
      <div className="flex items-center mt-4">
      <form onSubmit={handleApprovalChange} className="flex items-center space-x-56">
  <select
    id="approval"
    className="p-1 border rounded"
    value={approved}
    onChange={(e) => setApproved(e.target.value)}
  >
    <option value="true">Approve</option>
    <option value="false">Reject</option>
  </select>

  <button
    type="submit"
    className="bg-gray-500 text-white font-semibold px-3 py-1 rounded hover:bg-gray-700"
  >
    Submit
  </button>
</form>

        
      </div>
    </div>
    </>
}

export default TravelAgencyApproval