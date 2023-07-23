import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import utilities from '../utils/utilities';
const prisma = new PrismaClient();

export default {
	async generateRoom(req: Request, res: Response) {
		// create room id

		const roomId = utilities.createId();
		// get session id
		const sessionId = req.cookies.session as string;
		// fetches user id from the session key
		const user = await prisma.session.findUnique({
			where: { session_id: sessionId },
			select: { user_id: true },
		});
		// creates room
		const room = await prisma.chatRoom.create({
			data: {
				room_id: roomId,
				name: req.body.name,
				description: req.body.description,
				created_by: user?.user_id,
			},
		});

		res.send('Creation Complete');
	},
	async getRooms(req: Request, res: Response) {
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

		const chatRooms = await prisma.chatRoom.findMany({
			where: {
				created_at: {
					gte: today, // Filter by created_at greater than or equal to today's date
				},
			},
			orderBy: {
				created_at: 'desc', // Sort by created_at in descending order (latest first)
			},
		});

		res.send(chatRooms);
	},
	async getArchivedRooms(req: Request, res: Response) {
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

		const chatRooms = await prisma.chatRoom.findMany({
			where: {
				created_at: {
					lte: today, // Filter by created_at greater than or equal to today's date
				},
			},
			orderBy: {
				created_at: 'desc', // Sort by created_at in descending order (latest first)
			},
		});

		res.send(chatRooms);
	},
	async joinRoom(req: Request, res: Response) {
		const roomId = req.body.room_id as number;
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const participantId = utilities.createId();

		try {
			// get session id
			const sessionId = req.cookies.session as string;
			// fetches user id from the session key
			const user = await prisma.session.findUnique({
				where: { session_id: sessionId },
				select: { user_id: true },
			});

			const checkParticipant = await prisma.participant.count({
				where: { user_id: user?.user_id },
			});

			// get room id
			const room = await prisma.chatRoom.findUnique({
				where: { room_id: roomId },
				select: { room_id: true, created_at: true },
			});

			if (!user) {
				res.status(400).send('User does not exist');
				return;
			}

			if (checkParticipant != 0) {
				res.status(409).send('User is already joined the room');
				return;
			}

			if (!room) {
				res.status(400).send('Room does not exist');
				return;
			}

			if (room.created_at < today) {
				res.status(400);
				return;
			}

			const participants = await prisma.participant.create({
				data: {
					participant_id: participantId,
					room_id: room.room_id,
					user_id: user.user_id,
				},
			});

			res.sendStatus(200);
		} catch (error) {
			console.error('Error joining room:', error);
			return res.status(500).send('Internal Server Error');
		}
	},
	async getParticipants(req: Request, res: Response) {
		const roomId = req.body.room_id as number;
		try {
			const participants = await prisma.participant.findMany({
				where: {
					room_id: roomId,
				},
			});
			res.send(participants);
		} catch (error) {
			console.error('Error fetching room participants:', error);
			res.sendStatus(500).send('Internal Server Error');
		}
	},
};
