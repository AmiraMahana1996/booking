import User from "../models/User.js";
import { createError } from "../utils/error.js";
import bcrypt from 'bcryptjs'

//REGISTER
export const register = async (req, res, next) => {
    try {
        var salt=bcrypt.genSaltSync(10);
        var hash=bcrypt.hashSync(req.body.password,salt);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        });
        console.log(newUser)
       await newUser.save();
      res.status(200).json('Created Successfully!');
    } catch (err) {
        console.log(err)
      return next(createError(401, "Can't Create New One!"));
    }
  };

  //LOGIN
  export const login = async (req, res, next) => {
    try {
        var salt=bcrypt.genSaltSync(10);
        var hash=bcrypt.hashSync(req.body.password,salt);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        });
        console.log(newUser)
       await newUser.save();
      res.status(200).json('Created Successfully!');
    } catch (err) {
        console.log(err)
      return next(createError(401, "Can't Create New One!"));
    }
  };