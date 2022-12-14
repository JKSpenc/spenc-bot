// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
require('dotenv').config();
import { Command, ping, play, setintro, stop } from './commands';
import { intro } from './voice';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,
	 GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildVoiceStates] });

const commands = new Collection<string, Command>();
commands.set(ping.name, ping);
commands.set(play.name, play);
commands.set(stop.name, stop);
commands.set(setintro.name, setintro);

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

client.on(Events.VoiceStateUpdate, (oldState, newState) => {
	if (!newState.member || newState.member.user.bot) return;

	if (newState.channelId === null) return;

	// When joining a new channel
	if (oldState.channelId === null || oldState.channelId != newState.channelId) {
		console.log(newState.member.user.username + ' joined channel ' + newState.channel?.name + ' in server ' + newState.guild.name);
		intro.onStateChanged(oldState, newState);
	}
	
})

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);