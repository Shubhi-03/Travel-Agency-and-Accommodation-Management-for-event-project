import axios from "axios";
import { store } from "./appStore"; // Import Redux store
import { removeUser } from "../redux/userSlice"; // Action to log out user
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API, // Ensure this is set in .env
  withCredentials: true, // Ensure cookies are sent
});

// Interceptor to handle authentication errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      store.dispatch(removeUser()); // Remove user from Redux
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
