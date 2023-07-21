import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

import utilities from '../utils/utilities';
import crypto from 'crypto';
const prisma = new PrismaClient();

export default {
	async createSession(req: Request, res: Response) {
		const id = crypto.randomBytes(3).readUIntBE(0, 3) % 1000000;
		const session = utilities.generateSession();
		await prisma.session.create({
			data: { user_id: id, session_id: session },
		});
		res.cookie('session', session);
		return res.send('success');
	},

	async getSessions(req: Request, res: Response) {
		const data = await prisma.session.findMany();
		res.send(data);
	},
};
