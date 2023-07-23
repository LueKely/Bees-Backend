import { Request, Response, NextFunction } from 'express';

function checkExpiration(req: Request, res: Response, next: NextFunction) {
	// Get the "created_at" timestamp from the entity
	const roomTimestamp = req.body.date as Date;

	// Get the current time
	const currentTime = new Date();

	// Calculate the time difference in milliseconds
	const timeDifferenceMs = currentTime.getTime() - roomTimestamp.getTime();

	// Calculate the time difference in hours
	const timeDifferenceHours = timeDifferenceMs / (1000 * 60 * 60);

	if (timeDifferenceHours >= 24) {
		res.status(403).send('Room has expired');
		return;
	}
	next();
}
