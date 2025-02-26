import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addClientEvent } from "../utils/clientSlice.js";

const useClientEvent = (email) => {
  const dispatch = useDispatch();

  const getEventlist = async () => {
    try {
      const response = await axios.get(`/api/v1/clients/getEvents?email=${email}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });
      const events = response.data.data;
      dispatch(addClientEvent(events));
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };
  useEffect(() => {
    getEventlist();
  }, 
  // eslint-disable-next-line
  []);
};

export default useClientEvent;
