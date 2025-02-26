import { Router } from "express";
import { guestFormSubmit } from "../controllers/guest.controller.js";

const router = Router();

router.route("/guestForm").post(guestFormSubmit);

export default router;