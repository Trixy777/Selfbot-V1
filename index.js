const { Client: samuraisb } = require("djs-selfbot");
require("colors");
require("dotenv").config();
const fs = require("fs");

console.clear();  
console.log(`[!] Starting Pacer Selfbot v2`.blue);
console.log("-".repeat(36).yellow);

const { keep_alive } = require("./config.json");

if (keep_alive) {
  require("./modules/KeepAlive");
}

try {
  const bhuvsb = new samuraisb({
    intents: ["GUILDS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "GUILD_PRESENCES", "GUILD_SCHEDULED_EVENTS", "GUILD_VOICE_STATES", "GUILD_WEBHOOKS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"],
    allowedMentions: { repliedUser: false },
    partials: ["CHANNEL", "GUILD_MEMBER", "GUILD_SCHEDULED_EVENT", "MESSAGE", "REACTION", "USER"],
  });
  const handlers = fs.readdirSync("./handlers/");

  handlers.forEach((handler) => {
    require(`./handlers/${handler}`)(bhuvsb);
  });
  bhuvsb.login(process.env.TOKEN).catch((err) => console.log(`[×] Wrong Bot Token Provided.\n`.red, err));
} catch (err) {
  console.log("[ERROR], ", err);
}
