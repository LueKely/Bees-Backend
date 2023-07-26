import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';

import sessions from './routes/session';
import room from './routes/rooms';
import chat from './routes/chat';

const app = express();
const port = 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: { origin: ['http://localhost:3030'] },
});

// middleware
io.use((socket: Socket, next) => {
	socket.onAny((event, ...args) => {
		console.log(`Incoming event: ${event}`);
		console.log(`Data received: ${JSON.stringify(args)}`);
	});
	next();
});

// put all the the shit here
io.on('connection', (socket: Socket) => {
	// sends messages to all the people who are listining to it
	socket.on('send-message', (message, room) => {
		socket.to(room).emit('recieve-message', message);
	});
	// sends how many shemay are there in the room
	socket.on('add-pariticipant', (room) => {
		socket.to(room).emit('increment-pariticipant');
	});
});

app.get('/', (req: Request, res: Response) => {
	res.send('Goo Goo gaa gaa i am a babywaby');
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
