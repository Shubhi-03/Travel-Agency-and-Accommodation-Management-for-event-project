import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addEventManager } from "../utils/adminSlice.js";

const useEventManagerList = () => {
  const dispatch = useDispatch();

  const getEventManagerlist = async () => {
    try {
      const response = await axios.get("/api/v1/admin/eventManager", {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const eventManagers = response.data.data;
      console.log(eventManagers)
      if (eventManagers) {
        dispatch(addEventManager(eventManagers)); 
      }
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    getEventManagerlist();
  }, []);
};

export default useEventManagerList;
