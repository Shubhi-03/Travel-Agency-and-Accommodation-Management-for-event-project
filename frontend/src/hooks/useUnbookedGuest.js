import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUnbookedGuest } from "../utils/clientSlice.js";

const useUnbookedGuest = () => {
  const dispatch = useDispatch();

  const getUnbookedGuest = async () => {
    try {
      const response = await axios.get("/api/v1/clients/unbookedGuest", {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const unbookedGuest = response.data.data;
      console.log(unbookedGuest)
      dispatch(addUnbookedGuest(unbookedGuest));
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };
  useEffect(() => {
    getUnbookedGuest();
  }, []);
};

export default useUnbookedGuest;


