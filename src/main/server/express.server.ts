import { Request, Response } from "express";
import { appEnvs } from "../../app/envs";
import { createServer } from "../config/express.config";
import { makeRoutes } from "./app.routes";

export function runServer() {
	const app = createServer();

	app.get("/", (req: Request, res: Response) => {
		res.status(200).json({
			ok: true,
			message: "API Bombando",
		});
	});

	// CHAMADA PARA AS RODAS DE FUNCIONALIDADES
	makeRoutes(app);

	app.listen(appEnvs.port, () =>
		console.log("API esta rodando na porta " + appEnvs.port)
	);
}
