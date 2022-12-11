import dotenv from 'dotenv';
import App from './app';
import DevController from './controllers/devController'
import validateEnv from './utils/validateEnv';

dotenv.config();
validateEnv();

const app = new App(
	[
		new DevController()
	],
);

app.listen();
