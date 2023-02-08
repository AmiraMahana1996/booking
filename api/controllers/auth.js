import User from "../models/User.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//REGISTER
export const register = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    console.log(newUser);
    await newUser.save();
    res.status(200).json("Created Successfully!");
  } catch (err) {
    console.log(err);
    return next(createError(401, "Can't Create New One!"));
  }
};

//LOGIN
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
console.log(user)
    if (!user) {
      return next(createError(404, "This User Not Found!"));
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isPasswordCorrect)
        return next(createError(400, "Wrong Password Or Username!"));

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.jwt
      );
      const { password, isAdmin, ...otherDetails } = user._doc;
      res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json({ ...otherDetails });
    }
  } catch (err) {
    console.log(err);
    return next(createError(401, "Can't Create New One!"));
  }
};
