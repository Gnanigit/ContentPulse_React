import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
  addComment,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/* Add */
router.post("/addcomment", addComment);

/* Add */
router.delete("/:id/deletepost", verifyToken, deletePost);

export default router;
