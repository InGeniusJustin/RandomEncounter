import Discord, { Message } from "discord.js";
import { BotToken } from "./bot-token";
import { IEncounterGenerator, EncounterGenerator } from "./encounter-generator";
import { IMonster } from "./monster-manager";

export interface IBotClient
{
	Client: Discord.Client
}

class BotClient implements IBotClient
{
	protected _initialized = false;
	protected _discordClient: Discord.Client;
	protected _encounterGenerator: IEncounterGenerator;
	constructor()
	{
		this._discordClient = new Discord.Client();
		this._encounterGenerator = new EncounterGenerator();

		this._discordClient.on('ready', () =>
		{
			this._initialized = true;
			console.log("Logged in");
		});

		this._discordClient.on('message', message =>
		{
			if (message.author.bot) { return; }
			if (!this._initialized) { return; }
			if (!message.mentions.users.find((user, key) => user.equals(this._discordClient.user))) { return; }
			const command = message.content.replace(this._discordClient.user.toString(), "").trim().toLowerCase();
			console.log(command);
			if (command === "help")
			{
				const help = `generate: "Number of Player Characters[number]", "Average Level of Characters[number]", "Single Monster[true,false], "CompactForm[true,false]""` +
					`generate-type: "Type of creature[string]", "Number of Player Characters[number]", "Average Level of Characters[number]", "Single Monster[true,false]", "CompactForm[true,false]"`;
				message.channel.send();
			}
			else if (command.startsWith("generate:"))
			{
				let params = command.replace("generate:", "").trim().split(',');
				try
				{
					if (params.length !== 4) { throw Error("Invalid Number of arguments"); }
					const numberOfPlayers = parseInt(params[0], 10);
					const playerLevel = parseInt(params[1], 10);
					const singleMonster = params[2].trim() === "true" ? true : false;
					const compactView = params[3].trim() === "true" ? true : false;

					const monsters = this._encounterGenerator.GenerateEncounter(numberOfPlayers, playerLevel, singleMonster);
					const response = this.getMonstersAsString(monsters, compactView);
					message.channel.send(response, { split: true });
				}
				catch (e)
				{
					message.channel.send("Unable to parse generate command. Try using help to see the expected format");
				}
			}
			else if (command.startsWith("generate-type:"))
			{
				let params = command.replace("generate-type:", "").trim().split(',');
				try
				{
					if (params.length !== 5) { throw Error("Invalid Number of arguments"); }
					const enemyType = params[0];
					const numberOfPlayers = parseInt(params[1], 10);
					const playerLevel = parseInt(params[2], 10);
					const singleMonster = params[3] === "true" ? true : false;
					const compactView = params[4] === "true" ? true : false;

					const monsters = this._encounterGenerator.GenerateEncounter(numberOfPlayers, playerLevel, singleMonster, enemyType);
					const response = this.getMonstersAsString(monsters, compactView);
					message.channel.send(response, { split: true });
				}
				catch (e)
				{
					message.channel.send("Unable to parse generate command. Try using help to see the expected format");
				}
			}
			else if (command === 'ping')
			{
				const monsters = this._encounterGenerator.GenerateEncounter(3, 1, false);
				const response = this.getMonstersAsString(monsters, true);
				message.channel.send(response, { split: true });
			}
			else
			{
				message.channel.send("Didn't recognize the command try using help");
			}


		});

		this._discordClient.login(BotToken);
	}

	protected getMonstersAsString(monsters: IMonster[], compactView: boolean): string
	{
		let response = "";
		monsters.forEach(monster =>
		{
			response += `${monster.Amount ? monster.Amount : 1}x ${monster.Name} with CR: ${monster.CR}\n\tAC:${monster.AC}      HP:${monster.HP}     Speed:${monster.Speed}\n` +
				`\tStr:${monster.Str}  Dex:${monster.Dex},  Con:${monster.Con}  Int:${monster.Int}  Wis:${monster.Wis}  Cha:${monster.Cha}\n`;
			if (monster.Actions && !compactView)
			{
				response += `\tActions:\n`
				monster.Actions.forEach(action =>
				{
					response += `\t\t${action.name}: ${action.description}\n`
				})
			}
			if (monster.LegendaryActions && !compactView)
			{
				response += `\tLegendary Actions:\n`
				monster.LegendaryActions.forEach(action =>
				{
					response += `\t\t${action.name}: ${action.description}\n`
				})
			}
		});
		return response
	}

	public get Client() { return this._discordClient; }
}

const singleton = new BotClient();

export class BotClientSingleton
{
	static BotClient = singleton;
}
