declare namespace Express {
	interface Request {
		user: {
			id: string;
			profile: string;
			username: string;
			company: string;
		};
	}
}
