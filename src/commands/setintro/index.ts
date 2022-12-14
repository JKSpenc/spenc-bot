import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command } from '..'
import { Intro, intros } from '../../globals';
import { getInfo } from 'ytdl-core';


const execute = async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.user.id) return;
    
    const url = interaction.options.getString('url');
    if (url != null) {
        const offset = interaction.options.getInteger('offset')??0;
        intros.set(interaction.user.id, {url: url, offset: offset * 1000} as Intro);
        const info = await getInfo(url);
        if (offset === 0) {
            interaction.reply('Set intro for ' + interaction.user.username + ' to **' + info.videoDetails.title + '**');
        } else {
            interaction.reply('Set intro for ' + interaction.user.username + ' to **' + info.videoDetails.title + '** starting at `' + offset + '` seconds');
        }
    }
}

const builder = new SlashCommandBuilder()
    .setName('setintro')
    .setDescription('Sets a 10 second intro for the current user')
    .addStringOption(option => option.setName('url').setDescription('Video to use as in intro').setRequired(true))
    .addIntegerOption(option => option.setName('offset').setDescription('(Currently broken) Second to start playing the audio at'))

export const setintro = {
    name: builder.name,
    data: builder,
    execute
} as Command;