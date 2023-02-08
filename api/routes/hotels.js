import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { isAdmin } from "../utils/verify.js";

const router = express.Router();

//CREATE HOTEL
router.post("/", isAdmin, createHotel);

//UPDATE HOTEL
router.put("/:id", isAdmin, updateHotel);

//DELETE HOTEL
router.delete("/:id", isAdmin, deleteHotel);

//GET HOTEL
router.get("/:id", getHotel);

//GET ALL HOTELS
router.get("/", getHotels);

export default router;
