import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addTravelAgency } from "../utils/adminSlice.js";

const useTravelAgencyList = () => {
  const dispatch = useDispatch();

  const getTravelAgencylist = async () => {
    try {
      const response = await axios.get("/api/v1/admin/travelAgency", {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const travelAgency = response.data.data;
      console.log(travelAgency)
      dispatch(addTravelAgency(travelAgency));
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    getTravelAgencylist();
  }, []);
};

export default useTravelAgencyList;
