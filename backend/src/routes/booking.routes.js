import { Router } from "express";
import { accommodationApproval, createAccommodationBooking, createATravelAgencyBooking, getBookingById, getTravelAgencyBookings, travelAgencyApproval } from "../controllers/booking.controller.js";

const router = Router();

router.post('/travelAgencyBooking/:travelAgency', createATravelAgencyBooking);
router.post('/accommodationBooking', createAccommodationBooking);
router.get('/getTravelBookings', getTravelAgencyBookings);
router.get('/bookingDetails', getBookingById);
router.post('/travelApproval', travelAgencyApproval)
router.post('/accommodationApproval', accommodationApproval)
export default router;