import express, { Request, Response } from 'express';
import checkCookieExpiration from '../middleware/cookiesMiddleware';
import roomController from '../controller/roomController';
const room = express.Router();

room.put('/', checkCookieExpiration, roomController.generateRoom);
room.get('/', checkCookieExpiration, roomController.getRooms);
room.get('/archived', checkCookieExpiration, roomController.getArchivedRooms);

export default room;
