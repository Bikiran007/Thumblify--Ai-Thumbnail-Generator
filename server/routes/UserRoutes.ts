import express from 'express';
import { getThumbnailbyId, getUserThumbnails } from '../controllers/UserController.js';
import protect from '../middlewares/auth.js';

const Userrouter = express.Router();

Userrouter.get('/thumbnails',protect, getUserThumbnails);
Userrouter.get('/thumbnails/:id',protect, getThumbnailbyId);

export default Userrouter;