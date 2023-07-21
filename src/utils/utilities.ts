import { randomBytes } from 'crypto';
export default {
	generateSession(): string {
		const randomBytesBuffer = randomBytes(4); // 4 bytes will give us 6 Base64 characters (6*8 = 48 bits)
		const randomId = randomBytesBuffer
			.toString('base64')
			.replace(/[+/=]/g, '') // Remove unwanted characters from the Base64 string
			.substr(0, 6); // Take the first 6 characters

		return randomId;
	},
};
