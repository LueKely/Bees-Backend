import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';

import socketHandler from './websockets/socketHandler';

import sessions from './routes/session';
import room from './routes/rooms';
import chat from './routes/chat';

import cookie from 'cookie';

const app = express();
const port = 3000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: { origin: ['http://localhost:3030'] },
});

// middleware
io.use(socketHandler.middleware);

// put all the the shit here
io.on('connection', (socket: Socket) => {
	socketHandler.ping(socket);
	socketHandler.handleAddParticipant(socket);
	socketHandler.handleJoinRoom(socket);
	socketHandler.handleSendMessage(socket);
});

app.get('/', (req: Request, res: Response) => {
	res.send('The bees knees');
});

httpServer.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

// middleware
app.use(cookieParser());
app.use(express.json());
// routes
app.use('/session', sessions);
app.use('/room', room);
app.use('/chat', chat);
