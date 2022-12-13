import { AudioPlayer } from "@discordjs/voice";
import { Collection } from "discord.js";

export const audioPlayers = new Collection<string, AudioPlayer>();