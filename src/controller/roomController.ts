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

		const user = await prisma.session.findUnique({
			where: { session_id: sessionId },
			select: { user_id: true },
		});

		const room = await prisma.chatRoom.create({
			data: {
				room_id: randomNumber,
				name: req.body.name,
				description: req.body.description,
				created_by: user?.user_id,
			},
		});

		res.send('nice');
	},
	async getRooms(req: Request, res: Response) {
		const data = await prisma.chatRoom.findMany();
		res.send(data);
	},
};
