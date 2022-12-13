import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { AudioPlayerStatus, entersState } from '@discordjs/voice';
import { Command } from '..'
import { audioPlayers } from '../../players';

const execute = async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.guildId) return;
    let player = audioPlayers.get(interaction.guildId)
    if (player !== undefined) {
        player.stop();
        interaction.reply({ content: interaction.user.username + ' stopped playback, what a stinker 💩' })
        await entersState(player, AudioPlayerStatus.Idle, 5000);
        audioPlayers.delete(interaction.guildId)
    }

}

const builder = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('\Stops the currently playing audio and disconnects the bot from channel')

export const stop = {
    name: builder.name,
    data: builder,
    execute
} as Command;