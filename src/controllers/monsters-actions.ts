import { Router, Request, Response } from "express";
import { MonsterManager } from "../monster-manager";

const router: Router = Router();

const monsterManager = new MonsterManager();

router.all('/update', async (req: Request, res: Response) =>
{
	const monsters = await monsterManager.UpdateMonsters();
	res.status(200);
	res.type('json');
	res.send(monsters);

});

export const MonsterActions: Router = router;
