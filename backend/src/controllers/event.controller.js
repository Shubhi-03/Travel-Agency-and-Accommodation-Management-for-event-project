import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

const createAnEvent = asyncHandler(async(req, res) => {
const {name, description, startDate, endDate, budget, client, venue} = req.body;
if(!name) throw new ApiError(400, "Event name is required.");
if(!startDate) throw new ApiError(400, "Start Date is required.");
if(!endDate) throw new ApiError(400, "End Date is required.");
if(!venue) throw new ApiError(400, "Venue is required.");


}) 