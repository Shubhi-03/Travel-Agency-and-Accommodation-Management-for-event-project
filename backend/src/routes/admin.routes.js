import { Router } from "express";
import { addAccommodation, addTravelAgency, getAccommodationList, getEventManagerList, getEvents, getTravelAgency, removeAccommodation, removeClient, removeEvent, removeEventManager, removeTravelAgency } from "../controllers/admin.controller.js";

const router = Router();

router.route("/eventManager").get(getEventManagerList);
router.route("/travelAgency").get(getTravelAgency);
router.route("/accommodations").get(getAccommodationList);
router.route("/events").get(getEvents);
router.route("/addTravelAgency").post(addTravelAgency);
router.route("/addAccommodation").post(addAccommodation);
router.route("/removeTravelAgency").post(removeTravelAgency);
router.route("/removAccommodation").post(removeAccommodation);
router.route("/removeEvents").post(removeEvent);
router.route("/removeEventManager").post(removeEventManager);
router.route("/removeClient").post(removeClient);

export default router;