import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addAllEvent } from "../utils/adminSlice.js";

const useAllEvents = () => {
  const dispatch = useDispatch();

  const getAllEventsList = async () => {
    try {
      const response = await axios.get("/api/v1/admin/events", {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const Events = response.data.data;
      dispatch(addAllEvent(Events));
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    getAllEventsList();
  }, []);
};

export default useAllEvents;
