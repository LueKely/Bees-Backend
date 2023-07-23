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
		const oneDayInSeconds = 24 * 60 * 60; // 24 hours in seconds
		const expirationDate = new Date(Date.now() + oneDayInSeconds * 1000); // Current time + 24 hours

		await prisma.session.create({
			data: { user_id: id, session_id: session },
		});

		// generates cookies
		res.cookie('session', session, {
			maxAge: oneDayInSeconds * 1000,
			httpOnly: true,
		});

		return res.send('success');
	},

	async getAllSessions(req: Request, res: Response) {
		const data = await prisma.session.findMany({
			select: { user_id: true, created_at: true },
		});
		res.send(data);
	},

	async getUserInfo(req: Request, res: Response) {
		const sessionId = req.cookies.session as string;

		const data = await prisma.session.findUnique({
			where: { session_id: sessionId },
			select: { session_id: false },
		});

		if (!data) {
			return res.send(400);
		}

		res.send(data);
	},
};
