import { IMonster } from "./monster-manager";
import { Monsters } from "./monsters";

export interface IEncounterGenerator
{
	GenerateEncounter(numPlayers: number, playerLevel: number, singleMonster: boolean, enemyType?: string): IMonster[]
}

interface IMonsterRatio
{
	numMonsters: number;
	numCharacters: number;
	cr: number;
}

interface IMonsterGroup
{
	num: number;
	cr: number;
}

export class EncounterGenerator implements IEncounterGenerator
{
	public GenerateEncounter(numPlayers: number, playerLevel: number, singleMonster: boolean, enemyType?: string)
	{
		if (singleMonster && numPlayers >= 4 && numPlayers <= 6)
		{
			return this.getMonstersByCr([{ num: 1, cr: this.singleMonsterTable(numPlayers, playerLevel) }], enemyType);
		}
		switch (playerLevel)
		{
			case 1:
				return this.getMonstersByCr(this.multipleMonsterFirst(numPlayers, singleMonster), enemyType);
			case 2:
				return this.getMonstersByCr(this.multipleMonsterSecond(numPlayers, singleMonster), enemyType);
			case 3:
				return this.getMonstersByCr(this.multipleMonsterThird(numPlayers, singleMonster), enemyType);
			case 4:
				return this.getMonstersByCr(this.multipleMonsterFourth(numPlayers, singleMonster), enemyType);
			case 5:
				return this.getMonstersByCr(this.multipleMonsterFifth(numPlayers, singleMonster), enemyType);
			case 6:
				return this.getMonstersByCr(this.multipleMonsterSixth(numPlayers, singleMonster), enemyType);
			case 7:
				return this.getMonstersByCr(this.multipleMonsterSeventh(numPlayers, singleMonster), enemyType);
			case 8:
				return this.getMonstersByCr(this.multipleMonsterEighth(numPlayers, singleMonster), enemyType);
			case 9:
				return this.getMonstersByCr(this.multipleMonsterNinth(numPlayers, singleMonster), enemyType);
			case 10:
				return this.getMonstersByCr(this.multipleMonsterTenth(numPlayers, singleMonster), enemyType);
			case 11:
				return this.getMonstersByCr(this.multipleMonsterEleventh(numPlayers, singleMonster), enemyType);
			case 12:
				return this.getMonstersByCr(this.multipleMonsterTwelf(numPlayers, singleMonster), enemyType);
			case 13:
				return this.getMonstersByCr(this.multipleMonsterThirteenth(numPlayers, singleMonster), enemyType);
			case 14:
				return this.getMonstersByCr(this.multipleMonsterFourteenth(numPlayers, singleMonster), enemyType);
			case 15:
				return this.getMonstersByCr(this.multipleMonsterFifthteenth(numPlayers, singleMonster), enemyType);
			case 16:
				return this.getMonstersByCr(this.multipleMonsterSixteenth(numPlayers, singleMonster), enemyType);
			case 17:
				return this.getMonstersByCr(this.multipleMonsterSeventeenth(numPlayers, singleMonster), enemyType);
			case 18:
				return this.getMonstersByCr(this.multipleMonsterEightteenth(numPlayers, singleMonster), enemyType);
			case 19:
				return this.getMonstersByCr(this.multipleMonsterNineteenth(numPlayers, singleMonster), enemyType);
			case 20:
				return this.getMonstersByCr(this.multipleMonsterTwentieth(numPlayers, singleMonster), enemyType);
			default:
				return [];
		}
	}

	protected getMonstersByCr(crs: IMonsterGroup[], enemyType?: string): IMonster[]
	{
		const monsters: IMonster[] = [];

		crs.forEach(group =>
		{
			let monstersForCr = Monsters.filter(monster => monster.CR === group.cr);
			if (enemyType)
			{
				let tempArr = monstersForCr.filter(monster => monster.Type === enemyType);
				if (tempArr.length > 0) monstersForCr = tempArr;
			}
			const monster = monstersForCr[Math.floor(Math.random() * monstersForCr.length)];
			monster.Amount = group.num;
			monsters.push(monster);
		});

		return monsters
	}

	protected singleMonsterTable(numPlayers: number, playerLevel: number): number
	{
		let cr: number;
		if (playerLevel === 1)
		{
			cr = numPlayers === 4 ? 1 : 2
		}
		else if (playerLevel >= 2 && playerLevel <= 4)
		{
			cr = playerLevel + (numPlayers - 4);
		}
		else if (playerLevel <= 17)
		{
			cr = playerLevel + (numPlayers - 1);
		}
		else
		{
			cr = playerLevel + (numPlayers - 2);
		}
		return cr;
	}

	protected multipleMonsterFirst(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 2, cr: 0.125 },
			{ numCharacters: 1, numMonsters: 1, cr: 0.25 },
			{ numCharacters: 3, numMonsters: 1, cr: 0.5 },
			{ numCharacters: 5, numMonsters: 1, cr: 1 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 5) { return [{ num: 1, cr: 1 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 0.5 }]; }
			else { return [{ num: 1, cr: 0.25 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterSecond(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 3, cr: 0.125 },
			{ numCharacters: 1, numMonsters: 2, cr: 0.25 },
			{ numCharacters: 1, numMonsters: 1, cr: 0.5 },
			{ numCharacters: 3, numMonsters: 1, cr: 1 },
			{ numCharacters: 6, numMonsters: 1, cr: 2 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 2 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 1 }]; }
			else { return [{ num: 1, cr: 0.5 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterThird(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 5, cr: 0.125 },
			{ numCharacters: 1, numMonsters: 2, cr: 0.25 },
			{ numCharacters: 1, numMonsters: 1, cr: 0.5 },
			{ numCharacters: 2, numMonsters: 1, cr: 1 },
			{ numCharacters: 4, numMonsters: 1, cr: 2 },
			{ numCharacters: 6, numMonsters: 1, cr: 3 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 3 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 2 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 1 }]; }
			else { return [{ num: 1, cr: 0.5 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterFourth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 8, cr: 0.125 },
			{ numCharacters: 1, numMonsters: 4, cr: 0.25 },
			{ numCharacters: 1, numMonsters: 2, cr: 0.5 },
			{ numCharacters: 1, numMonsters: 1, cr: 1 },
			{ numCharacters: 2, numMonsters: 1, cr: 2 },
			{ numCharacters: 4, numMonsters: 1, cr: 3 },
			{ numCharacters: 6, numMonsters: 1, cr: 4 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 4 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 3 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 2 }]; }
			else { return [{ num: 1, cr: 1 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterFifth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 12, cr: 0.125 },
			{ numCharacters: 1, numMonsters: 8, cr: 0.25 },
			{ numCharacters: 1, numMonsters: 4, cr: 0.5 },
			{ numCharacters: 1, numMonsters: 2, cr: 1 },
			{ numCharacters: 1, numMonsters: 1, cr: 2 },
			{ numCharacters: 2, numMonsters: 1, cr: 3 },
			{ numCharacters: 3, numMonsters: 1, cr: 4 },
			{ numCharacters: 5, numMonsters: 1, cr: 5 },
			{ numCharacters: 6, numMonsters: 1, cr: 6 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 6 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 5 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 4 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 3 }]; }
			else { return [{ num: 1, cr: 2 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterSixth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 12, cr: 0.125 },
			{ numCharacters: 1, numMonsters: 9, cr: 0.25 },
			{ numCharacters: 1, numMonsters: 5, cr: 0.5 },
			{ numCharacters: 1, numMonsters: 2, cr: 1 },
			{ numCharacters: 1, numMonsters: 1, cr: 2 },
			{ numCharacters: 2, numMonsters: 1, cr: 3 },
			{ numCharacters: 2, numMonsters: 1, cr: 4 },
			{ numCharacters: 4, numMonsters: 1, cr: 5 },
			{ numCharacters: 5, numMonsters: 1, cr: 6 },
			{ numCharacters: 6, numMonsters: 1, cr: 7 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 7 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 6 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 5 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 4 }]; }
			else { return [{ num: 1, cr: 2 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterSeventh(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 12, cr: 0.125 },
			{ numCharacters: 1, numMonsters: 12, cr: 0.25 },
			{ numCharacters: 1, numMonsters: 6, cr: 0.5 },
			{ numCharacters: 1, numMonsters: 3, cr: 1 },
			{ numCharacters: 1, numMonsters: 1, cr: 2 },
			{ numCharacters: 1, numMonsters: 1, cr: 3 },
			{ numCharacters: 2, numMonsters: 1, cr: 4 },
			{ numCharacters: 3, numMonsters: 1, cr: 5 },
			{ numCharacters: 4, numMonsters: 1, cr: 6 },
			{ numCharacters: 5, numMonsters: 1, cr: 7 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 5) { return [{ num: 1, cr: 7 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 6 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 5 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 4 }]; }
			else { return [{ num: 1, cr: 3 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterEighth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 12, cr: 0.125 },
			{ numCharacters: 1, numMonsters: 12, cr: 0.25 },
			{ numCharacters: 1, numMonsters: 7, cr: 0.5 },
			{ numCharacters: 1, numMonsters: 4, cr: 1 },
			{ numCharacters: 1, numMonsters: 2, cr: 2 },
			{ numCharacters: 1, numMonsters: 1, cr: 3 },
			{ numCharacters: 2, numMonsters: 1, cr: 4 },
			{ numCharacters: 3, numMonsters: 1, cr: 5 },
			{ numCharacters: 3, numMonsters: 1, cr: 6 },
			{ numCharacters: 4, numMonsters: 1, cr: 7 },
			{ numCharacters: 6, numMonsters: 1, cr: 8 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 8 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 7 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 6 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 4 }]; }
			else { return [{ num: 1, cr: 3 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterNinth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 12, cr: 0.125 },
			{ numCharacters: 1, numMonsters: 12, cr: 0.25 },
			{ numCharacters: 1, numMonsters: 8, cr: 0.5 },
			{ numCharacters: 1, numMonsters: 4, cr: 1 },
			{ numCharacters: 1, numMonsters: 2, cr: 2 },
			{ numCharacters: 1, numMonsters: 1, cr: 3 },
			{ numCharacters: 1, numMonsters: 1, cr: 4 },
			{ numCharacters: 2, numMonsters: 1, cr: 5 },
			{ numCharacters: 3, numMonsters: 1, cr: 6 },
			{ numCharacters: 4, numMonsters: 1, cr: 7 },
			{ numCharacters: 5, numMonsters: 1, cr: 8 },
			{ numCharacters: 6, numMonsters: 1, cr: 9 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 9 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 8 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 7 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 6 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 5 }]; }
			else { return [{ num: 1, cr: 4 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterTenth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 12, cr: 0.125 },
			{ numCharacters: 1, numMonsters: 12, cr: 0.25 },
			{ numCharacters: 1, numMonsters: 10, cr: 0.5 },
			{ numCharacters: 1, numMonsters: 5, cr: 1 },
			{ numCharacters: 1, numMonsters: 2, cr: 2 },
			{ numCharacters: 1, numMonsters: 1, cr: 3 },
			{ numCharacters: 1, numMonsters: 1, cr: 4 },
			{ numCharacters: 2, numMonsters: 1, cr: 5 },
			{ numCharacters: 2, numMonsters: 1, cr: 6 },
			{ numCharacters: 3, numMonsters: 1, cr: 7 },
			{ numCharacters: 4, numMonsters: 1, cr: 8 },
			{ numCharacters: 5, numMonsters: 1, cr: 9 },
			{ numCharacters: 6, numMonsters: 1, cr: 10 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 10 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 9 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 8 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 7 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 6 }]; }
			else { return [{ num: 1, cr: 4 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterEleventh(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 6, cr: 1 },
			{ numCharacters: 1, numMonsters: 3, cr: 2 },
			{ numCharacters: 1, numMonsters: 2, cr: 3 },
			{ numCharacters: 1, numMonsters: 1, cr: 4 },
			{ numCharacters: 2, numMonsters: 1, cr: 5 },
			{ numCharacters: 2, numMonsters: 1, cr: 6 },
			{ numCharacters: 2, numMonsters: 1, cr: 7 },
			{ numCharacters: 3, numMonsters: 1, cr: 8 },
			{ numCharacters: 4, numMonsters: 1, cr: 9 },
			{ numCharacters: 5, numMonsters: 1, cr: 10 },
			{ numCharacters: 6, numMonsters: 1, cr: 11 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 11 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 10 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 9 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 8 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 7 }]; }
			else { return [{ num: 1, cr: 4 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterTwelf(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 8, cr: 1 },
			{ numCharacters: 1, numMonsters: 3, cr: 2 },
			{ numCharacters: 1, numMonsters: 2, cr: 3 },
			{ numCharacters: 1, numMonsters: 1, cr: 4 },
			{ numCharacters: 1, numMonsters: 1, cr: 5 },
			{ numCharacters: 2, numMonsters: 1, cr: 6 },
			{ numCharacters: 2, numMonsters: 1, cr: 7 },
			{ numCharacters: 3, numMonsters: 1, cr: 8 },
			{ numCharacters: 3, numMonsters: 1, cr: 9 },
			{ numCharacters: 4, numMonsters: 1, cr: 10 },
			{ numCharacters: 5, numMonsters: 1, cr: 11 },
			{ numCharacters: 6, numMonsters: 1, cr: 12 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 12 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 11 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 10 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 9 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 7 }]; }
			else { return [{ num: 1, cr: 5 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterThirteenth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 9, cr: 1 },
			{ numCharacters: 1, numMonsters: 4, cr: 2 },
			{ numCharacters: 1, numMonsters: 2, cr: 3 },
			{ numCharacters: 1, numMonsters: 2, cr: 4 },
			{ numCharacters: 1, numMonsters: 1, cr: 5 },
			{ numCharacters: 1, numMonsters: 1, cr: 6 },
			{ numCharacters: 2, numMonsters: 1, cr: 7 },
			{ numCharacters: 2, numMonsters: 1, cr: 8 },
			{ numCharacters: 3, numMonsters: 1, cr: 9 },
			{ numCharacters: 3, numMonsters: 1, cr: 10 },
			{ numCharacters: 4, numMonsters: 1, cr: 11 },
			{ numCharacters: 5, numMonsters: 1, cr: 12 },
			{ numCharacters: 6, numMonsters: 1, cr: 13 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 13 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 12 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 11 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 10 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 8 }]; }
			else { return [{ num: 1, cr: 6 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterFourteenth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 10, cr: 1 },
			{ numCharacters: 1, numMonsters: 4, cr: 2 },
			{ numCharacters: 1, numMonsters: 3, cr: 3 },
			{ numCharacters: 1, numMonsters: 2, cr: 4 },
			{ numCharacters: 1, numMonsters: 1, cr: 5 },
			{ numCharacters: 1, numMonsters: 1, cr: 6 },
			{ numCharacters: 2, numMonsters: 1, cr: 7 },
			{ numCharacters: 2, numMonsters: 1, cr: 8 },
			{ numCharacters: 3, numMonsters: 1, cr: 9 },
			{ numCharacters: 3, numMonsters: 1, cr: 10 },
			{ numCharacters: 4, numMonsters: 1, cr: 11 },
			{ numCharacters: 4, numMonsters: 1, cr: 12 },
			{ numCharacters: 5, numMonsters: 1, cr: 13 },
			{ numCharacters: 6, numMonsters: 1, cr: 14 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 14 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 13 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 14 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 10 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 8 }]; }
			else { return [{ num: 1, cr: 6 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterFifthteenth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 12, cr: 1 },
			{ numCharacters: 1, numMonsters: 5, cr: 2 },
			{ numCharacters: 1, numMonsters: 3, cr: 3 },
			{ numCharacters: 1, numMonsters: 2, cr: 4 },
			{ numCharacters: 1, numMonsters: 1, cr: 5 },
			{ numCharacters: 1, numMonsters: 1, cr: 6 },
			{ numCharacters: 1, numMonsters: 1, cr: 7 },
			{ numCharacters: 2, numMonsters: 1, cr: 8 },
			{ numCharacters: 2, numMonsters: 1, cr: 9 },
			{ numCharacters: 3, numMonsters: 1, cr: 10 },
			{ numCharacters: 3, numMonsters: 1, cr: 11 },
			{ numCharacters: 4, numMonsters: 1, cr: 12 },
			{ numCharacters: 5, numMonsters: 1, cr: 13 },
			{ numCharacters: 5, numMonsters: 1, cr: 14 },
			{ numCharacters: 6, numMonsters: 1, cr: 15 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 15 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 14 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 12 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 11 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 9 }]; }
			else { return [{ num: 1, cr: 7 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterSixteenth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 5, cr: 2 },
			{ numCharacters: 1, numMonsters: 3, cr: 3 },
			{ numCharacters: 1, numMonsters: 2, cr: 4 },
			{ numCharacters: 1, numMonsters: 1, cr: 5 },
			{ numCharacters: 1, numMonsters: 1, cr: 6 },
			{ numCharacters: 1, numMonsters: 1, cr: 7 },
			{ numCharacters: 2, numMonsters: 1, cr: 8 },
			{ numCharacters: 2, numMonsters: 1, cr: 9 },
			{ numCharacters: 2, numMonsters: 1, cr: 10 },
			{ numCharacters: 3, numMonsters: 1, cr: 11 },
			{ numCharacters: 4, numMonsters: 1, cr: 12 },
			{ numCharacters: 4, numMonsters: 1, cr: 13 },
			{ numCharacters: 5, numMonsters: 1, cr: 14 },
			{ numCharacters: 5, numMonsters: 1, cr: 15 },
			{ numCharacters: 6, numMonsters: 1, cr: 16 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 16 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 15 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 13 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 11 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 10 }]; }
			else { return [{ num: 1, cr: 7 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterSeventeenth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 7, cr: 2 },
			{ numCharacters: 1, numMonsters: 4, cr: 3 },
			{ numCharacters: 1, numMonsters: 3, cr: 4 },
			{ numCharacters: 1, numMonsters: 2, cr: 5 },
			{ numCharacters: 1, numMonsters: 1, cr: 6 },
			{ numCharacters: 1, numMonsters: 1, cr: 7 },
			{ numCharacters: 1, numMonsters: 1, cr: 8 },
			{ numCharacters: 2, numMonsters: 1, cr: 9 },
			{ numCharacters: 2, numMonsters: 1, cr: 10 },
			{ numCharacters: 2, numMonsters: 1, cr: 11 },
			{ numCharacters: 3, numMonsters: 1, cr: 12 },
			{ numCharacters: 3, numMonsters: 1, cr: 13 },
			{ numCharacters: 4, numMonsters: 1, cr: 14 },
			{ numCharacters: 4, numMonsters: 1, cr: 15 },
			{ numCharacters: 5, numMonsters: 1, cr: 16 },
			{ numCharacters: 6, numMonsters: 1, cr: 17 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 17 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 16 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 15 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 13 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 11 }]; }
			else { return [{ num: 1, cr: 8 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterEightteenth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 7, cr: 2 },
			{ numCharacters: 1, numMonsters: 5, cr: 3 },
			{ numCharacters: 1, numMonsters: 3, cr: 4 },
			{ numCharacters: 1, numMonsters: 2, cr: 5 },
			{ numCharacters: 1, numMonsters: 1, cr: 6 },
			{ numCharacters: 1, numMonsters: 1, cr: 7 },
			{ numCharacters: 1, numMonsters: 1, cr: 8 },
			{ numCharacters: 2, numMonsters: 1, cr: 9 },
			{ numCharacters: 2, numMonsters: 1, cr: 10 },
			{ numCharacters: 2, numMonsters: 1, cr: 11 },
			{ numCharacters: 3, numMonsters: 1, cr: 12 },
			{ numCharacters: 3, numMonsters: 1, cr: 13 },
			{ numCharacters: 4, numMonsters: 1, cr: 14 },
			{ numCharacters: 4, numMonsters: 1, cr: 15 },
			{ numCharacters: 5, numMonsters: 1, cr: 16 },
			{ numCharacters: 6, numMonsters: 1, cr: 17 },
			{ numCharacters: 6, numMonsters: 1, cr: 18 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 18 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 16 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 15 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 13 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 11 }]; }
			else { return [{ num: 1, cr: 8 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterNineteenth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 8, cr: 2 },
			{ numCharacters: 1, numMonsters: 5, cr: 3 },
			{ numCharacters: 1, numMonsters: 3, cr: 4 },
			{ numCharacters: 1, numMonsters: 2, cr: 5 },
			{ numCharacters: 1, numMonsters: 2, cr: 6 },
			{ numCharacters: 1, numMonsters: 1, cr: 7 },
			{ numCharacters: 1, numMonsters: 1, cr: 8 },
			{ numCharacters: 1, numMonsters: 1, cr: 9 },
			{ numCharacters: 2, numMonsters: 1, cr: 10 },
			{ numCharacters: 2, numMonsters: 1, cr: 11 },
			{ numCharacters: 2, numMonsters: 1, cr: 12 },
			{ numCharacters: 3, numMonsters: 1, cr: 13 },
			{ numCharacters: 3, numMonsters: 1, cr: 14 },
			{ numCharacters: 4, numMonsters: 1, cr: 15 },
			{ numCharacters: 4, numMonsters: 1, cr: 16 },
			{ numCharacters: 5, numMonsters: 1, cr: 17 },
			{ numCharacters: 6, numMonsters: 1, cr: 18 },
			{ numCharacters: 6, numMonsters: 1, cr: 19 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 19 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 17 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 16 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 14 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 12 }]; }
			else { return [{ num: 1, cr: 9 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected multipleMonsterTwentieth(numPlayers: number, singleMonster = false): IMonsterGroup[]
	{
		const ratios: IMonsterRatio[] = [
			{ numCharacters: 1, numMonsters: 9, cr: 2 },
			{ numCharacters: 1, numMonsters: 6, cr: 3 },
			{ numCharacters: 1, numMonsters: 4, cr: 4 },
			{ numCharacters: 1, numMonsters: 2, cr: 5 },
			{ numCharacters: 1, numMonsters: 2, cr: 6 },
			{ numCharacters: 1, numMonsters: 1, cr: 7 },
			{ numCharacters: 1, numMonsters: 1, cr: 8 },
			{ numCharacters: 1, numMonsters: 1, cr: 9 },
			{ numCharacters: 1, numMonsters: 1, cr: 10 },
			{ numCharacters: 2, numMonsters: 1, cr: 11 },
			{ numCharacters: 2, numMonsters: 1, cr: 12 },
			{ numCharacters: 2, numMonsters: 1, cr: 13 },
			{ numCharacters: 3, numMonsters: 1, cr: 14 },
			{ numCharacters: 3, numMonsters: 1, cr: 15 },
			{ numCharacters: 4, numMonsters: 1, cr: 16 },
			{ numCharacters: 4, numMonsters: 1, cr: 17 },
			{ numCharacters: 5, numMonsters: 1, cr: 18 },
			{ numCharacters: 5, numMonsters: 1, cr: 19 },
			{ numCharacters: 6, numMonsters: 1, cr: 20 },
		]

		if (singleMonster)
		{
			if (numPlayers >= 6) { return [{ num: 1, cr: 20 }]; }
			else if (numPlayers >= 5) { return [{ num: 1, cr: 19 }]; }
			else if (numPlayers >= 4) { return [{ num: 1, cr: 17 }]; }
			else if (numPlayers >= 3) { return [{ num: 1, cr: 15 }]; }
			else if (numPlayers >= 2) { return [{ num: 1, cr: 13 }]; }
			else { return [{ num: 1, cr: 10 }]; }
		}
		else
		{
			return this.getMonsterCrs(ratios, numPlayers);
		}
	}

	protected getMonsterCrs(ratios: IMonsterRatio[], numPlayers: number): IMonsterGroup[]
	{
		const monsterCrs: IMonsterGroup[] = []
		let playersRemaining = numPlayers;
		while (playersRemaining > 0)
		{
			const index = Math.floor(Math.random() * ratios.length);
			const ratio = ratios[index];
			if (ratio.numCharacters <= playersRemaining)
			{
				playersRemaining -= ratio.numCharacters
				monsterCrs.push({ num: ratio.numMonsters, cr: ratio.cr })
			}
		}
		return monsterCrs;
	}

}
