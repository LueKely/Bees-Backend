import { Router } from 'express';
import chatController from '../controller/chatController';
import checkCookieExpiration from '../middleware/cookiesMiddleware';
import checkRoomExpiration from '../middleware/roomCache';

const chat = Router();

chat.use(checkCookieExpiration);
chat.post('/:room_id', checkRoomExpiration, chatController.sendMessage);
chat.get('/:room_id', chatController.getMessages);
export default chat;
