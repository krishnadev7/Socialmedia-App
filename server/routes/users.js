import express from 'express';
import { addRemoveFriend, getUser } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

// Read
router.get('/:id',verifyToken, getUser);
router.get('/:id/friends',verifyToken, )

// Update
router.put('/:id/:friendId',verifyToken, addRemoveFriend)
export default router;
