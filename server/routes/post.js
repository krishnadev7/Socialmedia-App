import express from 'express';
import { getFeedPosts, getUserPost, likePost } from '../controllers/post.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

// Read
router.get('/',verifyToken,getFeedPosts)
router.get('/:userId/posts',verifyToken,getUserPost)

//Update
router.put('/:id/like',verifyToken, likePost)

export default router;