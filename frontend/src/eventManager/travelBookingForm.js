import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const TravelBooking = ({ travelAgency }) => {
  const [data, setData] = useState({
    name: "",
    travelDetails: {
      arrivalDate: "",
      departureDate: "",
      preference: "",
    },
    status: "Pending",
    approvalStatus: "Pending",
  });

  const makeABooking = async (e) => {
    e.preventDefault();

    const { name, travelDetails } = data;
    if (!name || !travelDetails.arrivalDate || !travelDetails.departureDate) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!travelAgency?._id) {
      toast.error("Invalid travel agency");
      return;
    }

    try {
      const response = await axios.post(
        `/api/v1/booking/travelAgencyBooking/${travelAgency._id}`, // Change this
        data,
        { withCredentials: true }
      );
      

      if (response.status === 200) {
        toast.success("Booking confirmed successfully!");
        setData({
          name: "",
          travelDetails: {
            arrivalDate: "",
            departureDate: "",
            preference: "",
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
            value={data.travelDetails.arrivalDate}
            onChange={(e) =>
              setData({
                ...data,
                travelDetails: {
                  ...data.travelDetails,
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
            value={data.travelDetails.departureDate}
            onChange={(e) =>
              setData({
                ...data,
                travelDetails: {
                  ...data.travelDetails,
                  departureDate: e.target.value,
                },
              })
            }
            className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Travel Preference
          </label>
          <input
            type="text"
            value={data.travelDetails.preference}
            onChange={(e) =>
              setData({
                ...data,
                travelDetails: {
                  ...data.travelDetails,
                  preference: e.target.value,
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

export default TravelBooking;
