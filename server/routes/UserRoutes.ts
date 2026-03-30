import express from 'express';
import { getThumbnailbyId, getUserThumbnails } from '../controllers/UserController.js';

const Userrouter = express.Router();

Userrouter.get('/thumbnails', getUserThumbnails);
Userrouter.get('/thumbnails/:id', getThumbnailbyId);

export default Userrouter;