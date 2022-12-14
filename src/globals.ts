import { AudioPlayer } from "@discordjs/voice";
import { Collection } from "discord.js";

export const audioPlayers = new Collection<string, AudioPlayer>();

export type Intro = {
    url: string,
    offset: number
}

// TODO: make this a sqlite db or something similar
export const intros = new Collection<string, Intro>(); 