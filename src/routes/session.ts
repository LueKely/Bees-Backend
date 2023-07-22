import express, { Request, Response } from 'express';
import sessionController from '../controller/sessionController';
import checkCookieExpiration from '../middleware/cookiesMiddleware';

const sessions = express.Router();
// creat a new session
sessions.put('/', sessionController.createSession);
// get all session
sessions.get('/', checkCookieExpiration, sessionController.getAllSessions);

export default sessions;
