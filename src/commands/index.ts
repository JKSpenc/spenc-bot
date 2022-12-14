import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export type Command = {
	name: string,
	data: SlashCommandBuilder,
	execute(interaction: ChatInputCommandInteraction): Promise<void>; 
}

export * from './ping'
export * from './play'
export * from './stop'
export * from './setintro'