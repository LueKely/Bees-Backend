import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const app = express();
const port = 3000;

// Define your routes and middleware here
const prisma = new PrismaClient();

app.get('/', (req: Request, res: Response) => {
	res.send('Goo Goo gaa gaa i am a babywaby');
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
