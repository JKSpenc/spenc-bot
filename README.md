# spenc-bot

Plays youtube videos and intros when people join a channel.

## Setup

Clone this project and run `npm install`

Once done, create a .env file in the project dir and populate accordingly.

```
BOT_TOKEN=<bot-token-from-discord-developer-portal>
CLIENT_ID=<bot-client-id-from-discord-developer-portal>
```

When we have all deps installed and the env vars setup then run `npm run register-commands` to regsiter your slash commands with the discord API.

After this we can finally run using:

```
npm run build; npm start
```

Or while developing:

```
npm run dev
```