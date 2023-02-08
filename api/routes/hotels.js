import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();

//CREATE HOTEL
router.post("/", verifyAdmin, createHotel);

//UPDATE HOTEL
router.put("/:id", verifyAdmin, updateHotel);

//DELETE HOTEL
router.delete("/:id", verifyAdmin, deleteHotel);

//GET HOTEL
router.get("/:id", getHotel);

//GET ALL HOTELS
router.get("/", getHotels);

export default router;
