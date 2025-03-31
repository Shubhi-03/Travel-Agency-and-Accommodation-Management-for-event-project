import { Router } from "express";
import { addGuest, getEvents, getGuestList, getUnbookedGuests } from "../controllers/client.controller.js";

const router = Router();

router.route("/getGuest").get(getGuestList);
router.route("/getEvents").get(getEvents);
router.route("/addGuest").post(addGuest);
router.route("/unbookedGuest").get(getUnbookedGuests);
export default router;
