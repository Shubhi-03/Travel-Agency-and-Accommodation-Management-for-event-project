import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addClientEvent } from "../utils/clientSlice.js";

const useClientEvent = (email) => {
  const dispatch = useDispatch();

  const getEventlist = async () => {
    if (!email) return; // Avoid making a request if email is undefined
    try {
      console.log("Fetching events for email:", email);
      const response = await axios.get(`/api/v1/clients/getEvents?email=${email}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("API Response:", response.data); // Debug API response
      const events = response.data.data;

      if (!events || events.length === 0) {
        console.warn("No events found for this email.");
      }

      dispatch(addClientEvent(events));
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    getEventlist();
  }, [email]); // Include `email` as a dependency

};

export default useClientEvent;
