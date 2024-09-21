import express from "express";
const userRoutes = express.Router();
import { upload } from "../helpers/imageUpload";
import { verifyToken } from "../helpers/verifyToken";
import {
  registerUser,
  loginUser,
  getProfile,
  changePassword,
  updateProfile,
  // deleteUser
} from "../controller/user.controller";

userRoutes.post("/register", upload.single("profileImage"), registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", verifyToken, getProfile);
userRoutes.put("/changepsw", verifyToken, changePassword);
userRoutes.put("/update-profile", verifyToken, upload.single("profileImage"), updateProfile);
// userRoutes.delete("/delete-user",verifyToken,deleteUser);

export default userRoutes;
