require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType,
} = require("discord.js");
const { getPriceData, getPriceOnPair, getH1PriceChangeOnPair } = require("./helper");

async function start() {
  console.log("[Start]");
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Channel],
  });

  client.on("ready", () => {
    updatePrice();

    setInterval(() => {
      console.log("in interval");
      try {
        updatePrice();
      } catch (e) {
        console.error(e);
      }
    }, 60000);
  });

  async function updatePrice() {
    console.log("[updatePrice]");
    try {
      const priceData = await getPriceData(
        "https://api.dexscreener.com/latest/dex/tokens/0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
      );
      const price = getPriceOnPair(priceData);
      const priceChange = getH1PriceChangeOnPair(priceData);
      const priceChangeString = `24h: ${priceChange}% ${
        priceChange < 0 ? "🔽" : "🔼"
      }`;
      console.log("priceChangeString", `${price} ${priceChangeString}`);
      client.user.setPresence({
        activities: [
          {
            name: `${priceChangeString}`,
            type: ActivityType.Watching,
          },
        ],
        status: "online",
      });

      client.guilds.cache.forEach(async (guild) => {
        try {
          const member = await guild.members.fetch(client.user.id);
          await member.setNickname(`$${price}`);
          console.log(`Updated HETH`);
        } catch (error) {
          console.error(
            `Failed to update nickname in guild: ${guild.name}`,
            error
          );
        }
      });
      console.log("return");
    } catch (e) {
      console.error(e);
    }
  }

  client.login(process.env.TOKEN);
}

start();
