import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

import utilities from '../utils/utilities';
import crypto from 'crypto';
const prisma = new PrismaClient();

export default {
	async createSession(req: Request, res: Response) {
		// random 6 digit no.
		const id = crypto.randomBytes(3).readUIntBE(0, 3) % 1000000;
		// generate session id
		const session = utilities.generateSession();
		//generate expiration date
		await prisma.session.create({
			data: { user_id: id, session_id: session },
		});
		// generates cookies
		req.session.user = session;
		return res.send(req.session);
	},

	async getAllSessions(req: Request, res: Response) {
		const data = await prisma.session.findMany({
			select: { user_id: true, created_at: true },
		});
		res.send(data);
	},

	async getUserInfo(req: Request, res: Response) {
		const sessionId = req.session.user;
		const data = await prisma.session.findUnique({
			where: { session_id: sessionId },
			select: { user_id: true, created_at: true },
		});
		if (!data) {
			return res.sendStatus(400);
		}

		res.send(data);
	},
};
