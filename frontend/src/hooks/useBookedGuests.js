import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addBookedGuest } from "../utils/clientSlice.js";

const useBookedGuest = () => {
  const dispatch = useDispatch();

  const getBookedGuest = async () => {
    try {
      const response = await axios.get("/api/v1/booking/getTravelBookings", {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const bookedGuest = response.data.data;
      console.log(bookedGuest)
      dispatch(addBookedGuest(bookedGuest));
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };
  useEffect(() => {
    getBookedGuest();
  }, []);
};

export default useBookedGuest;


