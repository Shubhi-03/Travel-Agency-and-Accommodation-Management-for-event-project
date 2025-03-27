import { Router } from "express";
import { createAccommodationBooking, createATravelAgencyBooking, getTravelAgencyBookings } from "../controllers/booking.controller.js";

const router = Router();

router.post('/travelAgencyBooking/:travelAgency', createATravelAgencyBooking);
router.post('/accommodationBooking', createAccommodationBooking);
router.get('/getTravelBookings', getTravelAgencyBookings);
export default router;