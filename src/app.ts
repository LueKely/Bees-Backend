import express, { Request, Response } from 'express';
const app = express();
const port = 3000;

// Define your routes and middleware here

app.get('/', (req: Request, res: Response) => {
	res.send('Hello, Express with TypeScript!');
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
