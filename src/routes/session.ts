import express, { Request, Response } from 'express';
import sessionController from '../controller/sessionController';
const sessions = express.Router();

sessions.put('/', sessionController.createSession);
sessions.get('/', sessionController.getSessions);

export default sessions;
