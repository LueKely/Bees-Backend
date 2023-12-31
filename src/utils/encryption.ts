import cryptoJs from 'crypto-js';

const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.PASSWORD; // Replace this with your secret key.

export function encryptMessage(message: string) {
	try {
		if (!secretKey) throw new Error('No environment key');
		const iv = cryptoJs.lib.WordArray.random(16);
		const encryptedContent = cryptoJs.AES.encrypt(message, secretKey, {
			iv,
		}).toString();
		return { encryptedContent, iv: iv.toString() };
	} catch (error) {
		console.error(error);
	}
}

export function decryptMessage(encryptedContent: string, iv: string): string {
	try {
		if (!secretKey) {
			throw new Error('No environment key');
		}

		const decrypted = cryptoJs.AES.decrypt(encryptedContent, secretKey, {
			iv: cryptoJs.enc.Hex.parse(iv),
		});

		return decrypted.toString(cryptoJs.enc.Utf8);
	} catch (error) {
		console.error(error);
		// You may want to handle the error gracefully and return an appropriate value instead of an empty string.
		// For example, you could throw an error or return a default value.
		throw error; // Or return a default value like: return '';
	}
}
