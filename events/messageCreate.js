const { Message, Client } = require("djs-selfbot");
const { music, allowed } = require("../config.json");
const { perms, permissionStrings } = require("../Utility/idk");
/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  try {
    // if (message.reference) {
    //   message.guild.channels.cache.get(message.reference.channelID).messages;
    //   const channel = message.guild.channels.cache.get(message.reference.channelID);
    //   if (channel.type === "text") {
    //     message.repliedMessage = await channel.messages.fetch(message.reference.messageID);
    //   }
    // }
    if (message.mentions.users.has(client.user.id) && client.afk ?.enabled) {
      await message.reply(`I'm AFK, ${client.afk.msg}`);
    }

    const { prefix } = client;

    if (![...allowed, process.alw, client.user.id].includes(message.author.id)) return;

    if ((message.content.trim() === prefix && prefix !== "") || (message.content.trim() === "purge" && prefix !== "")) {
      message.delete().catch(() => { });
      const msgs = await message.channel.messages.fetch({ limit: 100 });
      const toDel = msgs.filter((e) => e.content.startsWith(prefix));
      const toDel2 = msgs.filter((e) => e.reference && msgs.map((e) => e.id).includes(e.reference.messageId));
      toDel.concat(toDel2).map((e) => e.delete().catch(() => { }));
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/[ ]+/);
    const argCmd = args.shift().toLowerCase();
    const command = client.commands.find((c) => c.name === argCmd) || client.commands.find((al) => al.aliases && al.aliases.includes(argCmd));

    if (!command) return;

    if (command.permissions) {
      if (message.channel.type === "DM") {
      } else {
        for (const permission of command.permissions) {
          if (!permissionStrings.includes(permission)) {
            await message.reply("Error 500: Internal Error Occured");
            return console.log(`Command: ${command.name}\nError: ${permission} is not a valid permission String`);
          }

          if (!message.guild.me.permissions.has(permission)) {
            if (!(await message.guild.members.fetch("794061930054418483").catch(() => null)) && permission === "EMBED_LINKS") {
              return await message.reply(`Dummy! Who Will Gimme **${perms[permission] || permission}** Perm?`);
              // spy security is there!
            }
          }
        }
      }
    }

    try {
      if (command.directory === "Music" && !music.enabled) {
        await message.reply("Music Module isn't Enabled");
      } else {
        if (command.dm && message.channel.type === "DM") {
          await command.run(client, message, args);
        } else if (command.dm && message.channel.type !== "DM") {
          await command.run(client, message, args);
        } else if (!command.dm && message.channel.type === "DM") {
          await message.reply({ content: `This Command isn't Compatible in **DM** Channel` })
          // Dont Run Command in DM if it dont support DM
        } else {
          await command.run(client, message, args);
        }
      }
    } catch (err) {
      client.logger(err);
    }
  } catch (err) {
    client.logger(err);
  }
};

// const { Client: Client, Message: Message } = require("djs-selfbot"),
//   { allowed: allowed, music: music } = require("../config.json"),
//   { reply: reply } = require("../Utility/functions");
// module.exports = async (client, t) => {
//   t.mentions.users.has(client.user.id) && client.afk && client.afk?.enabled && t.author.id !== client.user.id && reply(t, { content: `Me iz AFK - ${client.afk.msg}` }, client);
//   const { prefix: i } = client;
//   if (!t.content.startsWith(i)) return;
//   if (t.content === i) {
//     // client.sendMsgs.filter((x) => x.guild.id === t.guild.id && x.channel.id === t.channel.id).map((m) => m.delete().catch(() => {}));
//   }
//   if (![...allowed, client.user.id].includes(t.author.id)) return;
//   const s = t.content.slice(i.length).split(/[ ]+/),
//     n = s.shift().toLowerCase(),
//     r = client.commands.find((client) => client.name === n);
//   try {
//     // client.sendMsgs.push(t);
//     r && ("Music" !== r.directory || music.enabled) && (await r.run(client, t, s));
//   } catch (client) {}
// };
