import express, { Request, Response } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

import sessions from './routes/session';
import room from './routes/rooms';
import chat from './routes/chat';

// env
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
	res.send('Goo Goo gaa gaa i am a babywaby');
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

// middleware
app.use(
	session({
		secret: 'your_secret_key_here',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		},
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
// routes
app.use('/session', sessions);
app.use('/room', room);
app.use('/chat', chat);
