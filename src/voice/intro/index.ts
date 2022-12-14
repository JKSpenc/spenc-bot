import { AudioPlayerStatus, createAudioPlayer, createAudioResource, DiscordGatewayAdapterCreator, entersState, joinVoiceChannel, VoiceConnectionStatus } from "@discordjs/voice";
import { VoiceState } from "discord.js";
import ytdl from "ytdl-core";
import { audioPlayers, intros } from '../../globals';

export const intro = {
    onStateChanged: async (oldState: VoiceState, newState: VoiceState) => {
        if (!newState.guild.id) return;
        // Null check done before this, safe to cast
        const userId = newState.member?.user.id as string;
        const intro = intros.get(userId);
        if (intro != null) {
            const channelId = newState.guild?.members.cache.get(userId)?.voice.channelId

            const connection = joinVoiceChannel({
                channelId: channelId as string,
                guildId: newState.guild.id as string,
                adapterCreator: newState.guild?.voiceAdapterCreator as DiscordGatewayAdapterCreator,
            });
            await entersState(connection, VoiceConnectionStatus.Ready, 1000);

            let player = audioPlayers.get(newState.guild.id)
            if (player === undefined) {
                player = createAudioPlayer();
            }
            connection.subscribe(player);
            const url = intro.url
            const stream = ytdl(url, {
                filter: "audioonly",
                quality: 'highestaudio',
                highWaterMark: 1 << 25,
                begin: intro.offset
            });

            player.play(createAudioResource(stream));

            await entersState(player, AudioPlayerStatus.Playing, 5000);
            audioPlayers.set(newState.guild.id, player)

            // Play for 10 seconds then disconnect
            new Promise(resolve => setTimeout(resolve, 10000)).then(() => {
                if (player) {
                    player.stop()
                    connection.disconnect()
                }
            })
        }
    }
}
