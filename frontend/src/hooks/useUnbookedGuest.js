import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUnbookedGuest } from "../utils/clientSlice.js";

const useUnbookedGuest = () => {
  console.log("✅ useUnbookedGuest is being called!"); // Debugging log

  const dispatch = useDispatch();

  const getUnbookedGuest = async () => {
    try {
      const response = await axios.get("/api/v1/clients/unbookedGuest", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
    
  
      const unBookedGuest = response.data.data;
  
      dispatch(addUnbookedGuest(unBookedGuest));
    } catch (error) {
      console.error("❌ Error fetching guests:", error);
    }
  };
  

  useEffect(() => {
    getUnbookedGuest();
  }, []);
};

export default useUnbookedGuest;
