// typings/custom.d.ts
import 'express-session';
declare namespace NodeJS {
	interface ProcessEnv {
		[key: string]: string | undefined;
	}
}
