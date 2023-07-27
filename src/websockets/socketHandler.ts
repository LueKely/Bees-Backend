import { Socket } from 'socket.io';
import cookie from 'cookie';
import { PrismaClient } from '@prisma/client';

const primsa = new PrismaClient();

export default {
	ping(socket: Socket) {
		socket.on('ping', (arg) => {
			console.log('USER HAS PINGED');
			socket.emit('pong', 'pong');
		});
	},

	handleJoinRoom(socket: Socket) {
		socket.on('join-room', (room: string) => {
			socket.join(room);
			console.log(`Socket ${socket.id} joined room: ${room}`);
		});
	},

	handleSendMessage(socket: Socket) {
		socket.on('send-message', (message: any, room: string) => {
			socket.to(room).emit('recieve-message', message);
		});
	},

	handleAddParticipant(socket: Socket) {
		socket.on('add-pariticipant', (room: string) => {
			socket.to(room).emit('increment-pariticipant');
		});
	},
	middleware(socket: Socket, next: (err?: any) => void) {
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
	},
};
