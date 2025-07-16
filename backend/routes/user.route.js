

import express from 'express'
import { protectRoute } from '../middlewares/protectRoute.js';
import { getUserProfile, getSuggestedUser , followUnfollowUser, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile/:username', protectRoute ,getUserProfile);
router.get('/suggested', protectRoute, getSuggestedUser)
router.post('/follow/:id', protectRoute ,followUnfollowUser)
router.post('/update', protectRoute ,updateUser);

export default router;

