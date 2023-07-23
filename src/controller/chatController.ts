import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { encryptMessage } from '../utils/encryption';
const prisma = new PrismaClient();

export default {
	async sendMessage(req: Request, res: Response) {
		const input = req.body.message as string;

		const message = encryptMessage(input);
		if (!message) {
			res.send(409);
		}
		res.send(message);
	},
};
