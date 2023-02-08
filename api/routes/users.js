import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/User.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verify.js";

const router = express.Router();
// //SHECK AUTHENTICATION
// router.get("/checkauth",verifyToken, (req, res, next) => {
//   console.log("k")
// res.send('authenticated')
// });

// //SHECK AUTHENTICATION
// router.get("/checkuser/:id",verifyUser, (req, res, next) => {
//   console.log("k")
// res.send('authrized')
// });

// //SHECK ADMIN
// router.get("/checkadmin/:id",isAdmin, (req, res, next) => {
//   console.log("k")
// res.send('authrized')
// });

//UPDATE User
router.put("/:id", verifyUser, updateUser);

//DELETE User
router.delete("/:id", verifyUser, deleteUser);

//GET User
router.get("/:id", verifyUser, getUser);

//GET ALL Users
router.get("/", verifyAdmin, getUsers);

router.get("/checkuser", verifyUser, (req, res, next) => {
  res.send("you can delete your account");
});
export default router;
