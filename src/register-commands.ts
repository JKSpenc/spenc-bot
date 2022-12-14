import { REST, Routes } from 'discord.js';
require('dotenv').config();
import { ping, play, setintro, stop } from './commands';

const commands = [
	ping.data.toJSON(),
	play.data.toJSON(),
	stop.data.toJSON(),
	setintro.data.toJSON(),
];

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN??'');

type HasLength = { length : number }

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID??'', process.env.GUILD_ID??''),
			{ body: [] },
		)

		// The put method is used to fully refresh all commands in the guild with the current set
		const data : HasLength = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID??''),
			{ body: commands },
		) as HasLength;

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
