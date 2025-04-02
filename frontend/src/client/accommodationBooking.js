import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const AccommodationBooking = ({ accommodation }) => {
  const user = useSelector((store)=>store.client.selectedGuest);
  console.log(user);
  const [data, setData] = useState({
    guest: user._id || "",  
    accommodationDetails: {
      arrivalDate: "",
      departureDate: user.departure_date || "",
      preference: "",
      venue: user.location || "",
      budget: "",
      accommodation_days:""
    },
    accommodationApprovalStatus: false,
  });
  console.log(accommodation)

  const makeABooking = async (e) => {
    e.preventDefault();

    const { user, accommodationDetails } = data;
    try {
      const response = await axios.post(
        `/api/v1/booking/accommodationBooking/${accommodation?._id}`, 
        data,
        { withCredentials: true }
      );
      

      if (response.status === 200) {
        toast.success("Booking confirmed successfully!");
        setData({
          name: "",
          accommodationDetails: {
            arrivalDate: "",
            departureDate:  "",
            preference: "",
            venue:  "",
            budget: "",
            accommodation_days:""
          },
          status: "pending",
          approvalStatus: "pending",
        });
      } else {
        toast.error("Failed to confirm booking. Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error(
        error.response?.data?.message || "Failed to create booking. Try again."
      );
    }
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "500px", opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-100 p-2 rounded-lg shadow-md"
    >
      <form onSubmit={makeABooking} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={data.name}
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
            className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Arrival Date</label>
          <input
            type="date"
            value={data.accommodationDetails.arrivalDate}
            onChange={(e) =>
              setData({
                ...data,
                accommodationDetails: {
                  ...data.accommodationDetails,
                  arrivalDate: e.target.value,
                },
              })
            }
            className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Departure Date</label>
          <input
  type="date"
  value={data.accommodationDetails.departureDate
    ? new Date(data.accommodationDetails.departureDate).toISOString().split("T")[0] 
    : ""}
  onChange={(e) =>
    setData({
      ...data,
      accommodationDetails: { ...data.accommodationDetails, departureDate: e.target.value },
    })
  }
  className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring focus:ring-blue-400"
/>

        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Venue
          </label>
          <input
            type="text"
            value={data.accommodationDetails.venue}
            onChange={(e) =>
              setData({
                ...data,
                accommodationDetails: {
                  ...data.accommodationDetails,
                  venue: e.target.value,
                },
              })
            }
            className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            budget
          </label>
          <input
            type="text"
            value={data.accommodationDetails.budget}
            onChange={(e) =>
              setData({
                ...data,
                accommodationDetails: {
                  ...data.accommodationDetails,
                  budget: e.target.value,
                },
              })
            }
            className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Stay days
          </label>
          <input
            type="text"
            value={data.accommodationDetails.accommodation_days}
            onChange={(e) =>
              setData({
                ...data,
                accommodationDetails: {
                  ...data.accommodationDetails,
                  accommodation_days: e.target.value,
                },
              })
            }
            className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Confirm Booking
        </button>
      </form>
    </motion.div>
  );
};

export default AccommodationBooking;
