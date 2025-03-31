import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addSelectedBooking } from "../utils/clientSlice.js";

const useBookingDetails = (id) => {
  const dispatch = useDispatch();

  const getBookingDetails = async () => {
    if (!id) return;
    try {
      const response = await axios.get(`/api/v1/booking/bookingDetails?bookingId=${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("API Response:", response.data); // Debug API response
      const details = response.data.data;


      dispatch(addSelectedBooking(details));
    } catch (error) {
      console.error("Error fetching details: ", error);
    }
  };

  useEffect(() => {
    getBookingDetails();
  }, []); 

};

export default useBookingDetails;
