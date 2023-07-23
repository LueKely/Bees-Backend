// typings/custom.d.ts
declare namespace NodeJS {
	interface ProcessEnv {
		[key: string]: string | undefined;
	}
}
