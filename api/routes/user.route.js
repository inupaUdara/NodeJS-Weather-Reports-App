import express from 'express';
import { createUser, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/create-user', createUser);
router.put('/update-user/:id', updateUser);

export default router;