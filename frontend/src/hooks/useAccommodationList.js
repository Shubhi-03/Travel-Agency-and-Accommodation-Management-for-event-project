import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addAccommodation } from "../utils/adminSlice.js";

const useAccommodationList = () => {
  const dispatch = useDispatch();

  const getAccommodationlist = async () => {
    try {
      const response = await axios.get("/api/v1/admin/accommodations", {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const accommodations = response.data.data;
      dispatch(addAccommodation(accommodations));
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    getAccommodationlist();
  }, []);
};

export default useAccommodationList;
