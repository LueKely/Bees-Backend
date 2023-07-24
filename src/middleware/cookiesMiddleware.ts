import { Request, Response, NextFunction } from 'express';

function checkCookieExpiration(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	const cookieName = 'session';
	const cookieValue = req.cookies[cookieName];
	if (!cookieValue) {
		// Cookie not found
		res.status(401).send('Access denied. Please log in to access this route.');
		return;
	}

	const expires = req.cookies[`${cookieName}.Expires`];
	if (expires) {
		const expirationDate = new Date(expires);
		const currentTime = new Date();
		if (expirationDate <= currentTime) {
			// The cookie is expired
			res.clearCookie(cookieName); // Clear the expired cookie from the browser
			res
				.status(401)
				.send('Access denied. The cookie has expired. Please log in again.');
			return;
		}
	}

	// The cookie is still valid, continue to the next middleware/route
	next();
}

export default checkCookieExpiration;
