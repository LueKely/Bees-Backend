import express, { Request, Response } from 'express';
import sessionController from '../controller/sessionController';
import checkCookieExpiration from '../middleware/cookiesMiddleware';

const sessions = express.Router();

sessions.put('/', sessionController.createSession);
// get all users
sessions.get('/', checkCookieExpiration, sessionController.getAllSessions);

export default sessions;
