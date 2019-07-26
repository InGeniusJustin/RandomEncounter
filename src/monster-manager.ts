import request from 'request-promise'
export interface IMonsterManager
{
	UpdateMonsters(): Promise<IMonster[]>;
}

export interface IMonster
{
	Name: string;
	AC: number;
	HP: number;
	CR: number;
	Speed: string;
	Type: string;
	Str: number;
	Dex: number;
	Con: number;
	Int: number;
	Wis: number;
	Cha: number;
	Actions?: IAction[]
	LegendaryActions?: IAction[]
	Amount?: number;
}

interface IMonsterUrl
{
	name: string,
	url: string,
}

interface IAction
{
	name: string;
	description: string;
}

export class MonsterManager implements IMonsterManager
{
	public async UpdateMonsters()
	{
		const monsters: IMonster[] = [];
		const options = {
			uri: "http://www.dnd5eapi.co/api/monsters",
			json: true
		}

		let monsterUrls: IMonsterUrl[] = []
		const result = await request(options);
		monsterUrls = <IMonsterUrl[]>result.results;
		for (let monsterUrl of monsterUrls)
		{
			options.uri = monsterUrl.url
			const reply = await request(options)

			// console.log(`parsed name is ${reply.name}`);
			// console.log(`parsed ac is ${reply.armor_class}`);
			// console.log(`parsed hp is ${reply.hit_points}`);
			// console.log(`parsed Cr is ${reply.challenge_rating}`);
			const monster: IMonster = {
				Name: reply.name,
				AC: reply.armor_class,
				HP: reply.hit_points,
				CR: reply.challenge_rating,
				Speed: reply.speed,
				Type: reply.type,
				Str: reply.strength ? reply.strength : 10,
				Dex: reply.dexterity ? reply.dexterity : 10,
				Con: reply.constitution ? reply.constitution : 10,
				Int: reply.intelligence ? reply.intelligence : 10,
				Wis: reply.wisdom ? reply.wisdom : 10,
				Cha: reply.charisma ? reply.charisma : 10,
			}
			if (reply.actions) { monster.Actions = reply.actions.map((act: any) => ({ name: act.name, description: act.desc })) }
			if (reply.legendary_actions) { monster.LegendaryActions = reply.legendary_actions.map((act: any) => ({ name: act.name, description: act.desc })) }
			monsters.push(monster);

		}
		// console.log("returning");
		return monsters;
	}
}
