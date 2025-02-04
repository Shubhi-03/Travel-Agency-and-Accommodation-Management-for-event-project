import axios from "axios";
import { useDispatch } from "react-redux";
import { addEvent } from "../utils/eventSlice.js";
import { useEffect } from "react";

const useEventList = () => {
  const dispatch = useDispatch();

  const getEventlist = async () => {
    try {
      const response = await axios.get("/api/v1/events/getEvents", {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const events = response.data.data;
      console.log(events)
      dispatch(addEvent(events));
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    getEventlist();
  }, []);
};

export default useEventList;
