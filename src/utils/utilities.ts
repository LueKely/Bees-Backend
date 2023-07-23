import { randomBytes } from 'crypto';
import crypto from 'crypto';
export default {
	generateSession(): string {
		const randomBytesBuffer = randomBytes(4); // 4 bytes will give us 6 Base64 characters (6*8 = 48 bits)
		const randomId = randomBytesBuffer
			.toString('base64')
			.replace(/[+/=]/g, '') // Remove unwanted characters from the Base64 string
			.substr(0, 6); // Take the first 6 characters

		return randomId;
	},
	createId() {
		// create room id
		const randomBytes = crypto.randomBytes(2); // 2 bytes = 16 bits
		const randomNumber = randomBytes.readUInt16BE(0) % 10000;
		return randomNumber;
	},

	generateSixDigitRandomNumber(): number {
		const min = 100000; // Minimum six-digit number (100000)
		const max = 999999; // Maximum six-digit number (999999)
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
};
