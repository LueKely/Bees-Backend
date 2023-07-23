import { Router } from 'express';
import chatController from '../controller/chatController';
import checkCookieExpiration from '../middleware/cookiesMiddleware';
import checkRoomExpiration from '../middleware/roomCache';

const chat = Router();

chat.use(checkCookieExpiration);
chat.put('/', checkRoomExpiration, chatController.sendMessage);

export default chat;
