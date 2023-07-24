import { Request, Response, NextFunction } from 'express';

function checkCookieExpiration(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	// Check if the session cookie has an expiration date
	if (req.session && req.session.cookie && req.session.cookie.expires) {
		const currentTimestamp = Date.now();
		const cookieExpirationTimestamp = new Date(
			req.session.cookie.expires
		).getTime();

		// Compare the current time with the expiration time of the session cookie
		if (currentTimestamp > cookieExpirationTimestamp) {
			res.status(401).send('Session cookie has expired.');
			return;
		}
	}
	if (!req.session) {
		res.status(401).send('No session');
		return;
	}
	if (!req.session.newSession) {
		res.status(401).send('No session user');
		return;
	}
	// The cookie is still valid, continue to the next middleware/route
	next();
}

export default checkCookieExpiration;
