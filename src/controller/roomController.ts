import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
	async generateRoom(req: Request, res: Response) {
		// get session id
		const sessionId = req.cookies.session as string;

		const user = await prisma.session.findUnique({
			where: { session_id: sessionId },
		});

		res.send(sessionId);
	},
	async getRooms(req: Request, res: Response) {
		const data = await prisma.chatRoom.findMany();
		res.send(data);
	},
};
