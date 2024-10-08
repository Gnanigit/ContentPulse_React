import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateGeneralDetails,
  updatePassword,
  updateProfilePicture,
  getUserNotFriends,
  deleteUserAccount, // Import the delete function
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/notfriends", verifyToken, getUserNotFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.post("/:id/updategd", updateGeneralDetails);
router.post("/:id/updatepass", updatePassword);
router.post("/:id/updatepic", updateProfilePicture);

/* DELETE */
router.delete("/:id/deleteaccount", verifyToken, deleteUserAccount);

export default router;
