import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      return next(createError(401, "Can't room to hotel!"));
    }
    res.status(200).json(newRoom);
  } catch (err) {
    return next(createError(401, "Can't Create New Room!"));
  }
};

export const updateRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    return next(createError(401, "Can't Create New One!"));
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);

    //update hotel
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {}

    res.status(200).json("Room has been deleted");
  } catch (err) {
    return next(createError(401, "Can't Delete Room!"));
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
    console.log(room);
  } catch (err) {
    return next(createError(401, "Sorry Not Found!"));
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Hotel.find();
    res.status(200).json(rooms);
  } catch (err) {
    return next(createError(401, "Sorry Not Found!"));
  }
};
