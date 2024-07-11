import express from 'express';
import { createUser, getWeatherData, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/create-user', createUser);
router.put('/update-user/:id', updateUser);
router.get('/weather-data', getWeatherData);

export default router;