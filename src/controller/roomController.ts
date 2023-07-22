import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
const prisma = new PrismaClient();

export default {
	async generateRoom(req: Request, res: Response) {
		// create room id
		const randomBytes = crypto.randomBytes(2); // 2 bytes = 16 bits
		const randomNumber = randomBytes.readUInt16BE(0) % 10000;
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
				room_id: randomNumber,
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
};
