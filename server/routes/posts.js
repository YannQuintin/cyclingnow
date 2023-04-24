import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//* READ */
router.get("/", verifyToken, getFeedPosts); //* this grabs the user feeds when we are on the home page.
router.get("/:userId/posts", verifyToken, getUserPosts);

//* UPDATE */
router.patch("/:id/like", verifyToken, likePost); //* this is for liking the post

export default router;
