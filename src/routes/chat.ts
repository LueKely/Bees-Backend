import { Request, Response } from 'express';
import { Router } from 'express';
import chatController from '../controller/chatController';
import checkCookieExpiration from '../middleware/cookiesMiddleware';
const chat = Router();

chat.use(checkCookieExpiration);
chat.put('/', chatController.sendMessage);

export default chat;
