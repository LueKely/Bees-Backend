import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { encryptMessage } from '../utils/encryption';
import utilities from '../utils/utilities';
const prisma = new PrismaClient();

export default {
	async sendMessage(req: Request, res: Response) {
		const input = req.body.message as string;
		const roomId = req.body.room_id as number;
		const userId = req.body.user_id as number;
		const message = encryptMessage(input);
		if (!message) {
			res.send(409);
			return;
		}
		try {
			await prisma.message.create({
				data: {
					message_id: utilities.generateSixDigitRandomNumber(),
					room_id: roomId,
					user_id: userId,
					content: message.encryptedContent,
					iv: message.iv,
				},
			});

			res.send('message sent');
		} catch (error) {
			res.status(400).send('fetching error');
		}
	},
};
