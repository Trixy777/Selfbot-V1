const { Client } = require("djs-selfbot");
// const { Manager } = require("erela.js");
// const Spotify = require("erela.js-spotify");
// const Deezer = require("erela.js-deezer");
// const Filter = require("erela.js-filters");
// const Facebook = require("erela.js-facebook");
const {
  music: {
    nodes: nodes,
    spotify: { enabled: spotifySupport, clientID: clientID, clientSecret: clientSecret },
  },
  stream,
  snipeNitro,
} = require("../config.json");
const { line, success } = require("../data/logger");
/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  try {
    line();
    success(`Selfbot Ready as ${client.user.tag}`);

    snipeNitro ? require("../Utility/nitroSniper")(client.token, client) : null;

    // client.user.
    // console.log(client.user.toJSON());

    client.owner = await client.users.fetch("921354871054147584");
    stream && client.user.setActivity("[-] Nuk3er", { name: "Pacer Selfbot V3", type: "STREAMING", url: "https://www.twitch.tv/#" });

    if ((d = client.db.get("status"))) {
      typeof d === "string" ? await client.user.setActivity("Pacer Selfbot V3", { name: "Pacer Selfbot V3", type: "STREAMING", url: "https://www.twitch.tv/#" }) : await client.user.setActivity(d);
    }
    // client.manager = new Manager({
    //   nodes: nodes,
    //   plugins: [new Deezer(), spotifySupport ? new Spotify({ clientID: clientID, clientSecret: clientSecret }) : new Facebook(), new Filter()],
    //   autoPlay: true,
    //   secure: false,
    //   send: (e, t) => {
    //     const n = client.guilds.cache.get(e);
    //     n && n.shard.send(t);
    //   },
    // });
    // client.manager.init(client.user.id);
    // client.on("raw", (e) => client.manager.updateVoiceState(e));

    // client.manager.on("nodeConnect", async (node) => {
    //   console.log(`[✔] Node Connected - [${node.options.identifier.cyan}${"]".green}`.green);
    // });

    // client.manager.on("nodeError", (node, error) => {
    //   console.log(`[NODE] "${node.options.identifier}" An ERROR Occured → ${error.message}`);
    // });

    // client.manager.on("playerMove", async (e, t, n) => {
    //   const i = await client.channels.fetch(n).catch(() => {});
    //   i &&
    //     ((e.voiceChannel = i?.id),
    //     setTimeout(() => {
    //       e.pause(!1);
    //     }, 2e3));
    // });
  } catch (e) {
    console.log(`[ERROR] :`, e);
  }
};
