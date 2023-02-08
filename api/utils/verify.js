import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.jwt, (err, user) => {
    if (err) return next(createError(403, "Token not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res,next, () => {
    console.log(req.user);

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "you are not autherized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);

    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "you are not admin!"));
    }
  });
};
