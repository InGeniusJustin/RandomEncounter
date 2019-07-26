import { Router, Request, Response } from "express";
import { BotClientSingleton } from "../bot-events";


const router: Router = Router();
const discordClient = BotClientSingleton.BotClient.Client;

router.all('./', (req: Request, res: Response) =>
{
	res.type('json');
	res.status(200);
	res.send({ message: "Got Here" });
});

router.all('/servers', (req: Request, res: Response) =>
{
	res.type('json');
	res.status(200);
	res.send(discordClient.channels);
});

export const BotActions: Router = router;
