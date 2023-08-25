require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType,
} = require("discord.js");
const {
  getPriceData,
  getPriceOnPair,
  getH1PriceChangeOnPair,
} = require("./helper");

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
      const query = {
        query: `
          {
            getTokenPrices(inputs: [
              { address: "0xB0cb6dE25BFc5811E323DBF0495d9BA6A154f43a", networkId: 109 }
            ]) {
              priceUsd
            }
          }
        `,
      };

      const reqResponse = await fetch("https://api.defined.fi/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.DEFINED_KEY,
        },
        body: JSON.stringify(query),
      });

      const res = await reqResponse.json();

      client.user.setPresence({
        activities: [
          {
            name: `$DOPA Price`,
            type: ActivityType.Watching,
          },
        ],
        status: "online",
      });

      client.guilds.cache.forEach(async (guild) => {
        try {
          const member = await guild.members.fetch(client.user.id);
          await member.setNickname(`$${res.data.getTokenPrices[0].priceUsd}`);
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
