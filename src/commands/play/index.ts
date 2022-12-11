import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { AudioPlayerStatus, createAudioPlayer, createAudioResource, DiscordGatewayAdapterCreator, entersState, joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';
import ytdl, { videoInfo } from 'ytdl-core';
import { Command } from '../..';

const execute = async (interaction: ChatInputCommandInteraction) => {
    const url = interaction.options.getString('url');
    if (url != null) {
        const userId = interaction.member?.user.id as string
        const channelId = interaction.guild?.members.cache.get(userId)?.voice.channelId

        const connection = joinVoiceChannel({
            channelId: channelId as string,
            guildId: interaction.guildId as string,
            adapterCreator: interaction.guild?.voiceAdapterCreator as DiscordGatewayAdapterCreator,
        });
        await entersState(connection, VoiceConnectionStatus.Ready, 1000);

        

        const player = createAudioPlayer();
        connection.subscribe(player);
        const stream = ytdl(url, {
            filter: "audioonly",
            quality: 'highestaudio',
            highWaterMark: 1 << 25
        });
        
        stream.on('info' , (info : videoInfo) => {
            interaction.reply({content: 'Playing **' + info.videoDetails.title + '**'})
        })
        player.play(createAudioResource(stream));

        await entersState(player, AudioPlayerStatus.Playing, 5000);
    }
}

const builder = new SlashCommandBuilder()
.setName('play')
.setDescription('Play a video from youtube')
.addStringOption(option => option.setName('url').setDescription('Video to play').setRequired(true))

export default {
    name: builder.name,
	data: builder,
	execute
} as Command;