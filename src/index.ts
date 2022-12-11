// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, Collection, SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
require('dotenv').config();
import { ping } from './commands';
import play from './commands/play';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,
	 GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildVoiceStates] });

export type Command = {
	name: string,
	data: SlashCommandBuilder,
	execute(interaction: ChatInputCommandInteraction): Promise<void>; 
}

const commands = new Collection<string, Command>();
commands.set(ping.name, ping);
commands.set(play.name, play);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);