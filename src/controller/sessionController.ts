import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export default {
	async createSession(req: Request, res: Response) {
		await prisma.session.create({
			data: { user_id: 100, session_id: 'hello' },
		});

		return res.send('success');
	},

	async getSessions(req: Request, res: Response) {
		const data = await prisma.session.findMany();
		res.send(data);
	},
};
