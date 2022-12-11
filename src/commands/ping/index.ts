import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command } from '../..';

const execute = async (interaction: CommandInteraction) => {
	await interaction.reply('Pong!');
}

const builder = new SlashCommandBuilder()
.setName('ping')
.setDescription('Replies with Pong!')

export default {
	name: builder.name,
	data: builder,
	execute
} as Command;