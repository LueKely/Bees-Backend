import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';

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
io.use((socket: Socket, next) => {
	socket.onAny((event, ...args) => {
		console.log(`Incoming event: ${event}`);
		console.log(`Data received: ${JSON.stringify(args)}`);
	});

	if (!socket.handshake.headers.cookie) {
		const error = new Error('Unauthorized');
		return next(error);
	}

	const cookies = cookie.parse(socket.handshake.headers.cookie);

	// Check if the cookie exists and if it is expired
	if (cookies.session) {
		const expirationTimestamp = parseInt(cookies.session, 10);
		const currentTime = Math.floor(Date.now() / 1000); // Convert to UNIX timestamp

		if (currentTime > expirationTimestamp) {
			const error = new Error('Cookie is expired');
			return next(error);
		}
	}

	console.log(cookies.session); // prints le cookie

	next();
});

// put all the the shit here
io.on('connection', (socket: Socket) => {
	// sends messages to all the people who are listining to it
	socket.on('join-room', (room) => {
		// Join the room
		socket.join(room);

		// You can perform additional actions here when the client joins the room

		console.log(`Socket ${socket.id} joined room: ${room}`);
	});

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
