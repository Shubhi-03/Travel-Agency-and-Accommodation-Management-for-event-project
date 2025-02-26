// import React, { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { removeUser } from "../redux/actions/userActions"; // Ensure this action exists
// import { toast } from "react-toastify"; // Import toast for notifications

// const AutoLogout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const timeoutRef = useRef(null); // Persistent reference

//   const logout = async () => {
//     localStorage.removeItem("authToken");
//     Cookies.remove("authToken"); // Remove from cookies

//     try {
//       const response = await axios.post(
//         "/api/v1/users/logout",
//         {},
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );

//       if (response.data.success) {
//         toast.success("Logged out.");
//         dispatch(removeUser()); // Remove user from Redux
//         navigate("/login");
//       } else {
//         toast.error(response.data.message || "Logout failed.");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error(error.response?.data?.message || "An error occurred.");
//     }
//   };

//   const checkTokenExpiry = () => {
//     const token = localStorage.getItem("authToken") || Cookies.get("authToken");
//     if (!token) return;

//     try {
//       const decodedToken = jwtDecode(token);
//       if (decodedToken.exp * 1000 < Date.now()) {
//         logout(); // Auto logout if token expired
//       }
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       logout(); // Logout on decoding error
//     }
//   };

//   const resetTimer = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(logout, 15 * 60 * 1000); // Auto logout after 15 min of inactivity
//   };

//   useEffect(() => {
//     window.addEventListener("mousemove", resetTimer);
//     window.addEventListener("keydown", resetTimer);

//     checkTokenExpiry(); // Check token on load
//     resetTimer();

//     return () => {
//       window.removeEventListener("mousemove", resetTimer);
//       window.removeEventListener("keydown", resetTimer);
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, []);

//   return null;
// };

// export default AutoLogout;
