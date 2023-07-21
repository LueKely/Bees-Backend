import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import sessions from './routes/session';
import 'express-async-errors';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
	res.send('Goo Goo gaa gaa i am a babywaby');
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
app.use(express.json());
app.use('/session', sessions);
