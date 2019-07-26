import express from 'express';

// Import WelcomeController from controllers entry point
import { BotActions, MonsterActions } from './controllers';

import * as fs from 'fs';
import * as https from 'https';
import { BotClientSingleton } from './bot-events';
// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port: number = <number>(process.env.PORT || 3000);

// Mount the WelcomeController at the /welcome route

app.use('/', BotActions);
app.use('/monster', MonsterActions);

const httpsOptions = {
	key: fs.readFileSync('./key.pem'),
	cert: fs.readFileSync('./cert.pem')
}

const server = https.createServer(httpsOptions, app).listen(port, () =>
{
	console.log(`Listening at https://localhost:${port}/`);
})

const botClient = BotClientSingleton.BotClient;
