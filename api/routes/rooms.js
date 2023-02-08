import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verify.js";
const router = express.Router();

//CREATE Room
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE Room
router.put("/:id", verifyAdmin, updateRoom);

//DELETE Room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET Room
router.get("/:id", getRoom);

//GET ALL RoomS
router.get("/", getRooms);

export default router;
