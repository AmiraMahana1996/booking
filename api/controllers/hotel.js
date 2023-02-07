import Hotel from '../models/Hotel.js'
import { createError } from "../utils/error.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    return next(createError(401, "Can't Create New One!"));
  }
};

export const updateHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    return next(createError(401, "Can't Create New One!"));
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    return next(createError(401, "Can't Delete!"));
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
    console.log(hotel);
  } catch (err) {
    return next(createError(401, "Sorry Not Found!"));
  }
};

export const getHotels = async (req, res, next) => {
  try {
    const Hotels = await Hotel.find();
    res.status(200).json(Hotels);
  } catch (err) {
    return next(createError(401, "Sorry Not Found!"));
  }
};
