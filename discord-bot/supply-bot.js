require("dotenv").config();
const { ethers } = require('ethers');
const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType,
} = require("discord.js");

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

      const provider = new ethers.providers.JsonRpcProvider('https://www.shibrpc.com/');
      const tokenAddress = '0xB0cb6dE25BFc5811E323DBF0495d9BA6A154f43a';
      const walletAddress = '0x000000000000000000000000000000000000dEaD';
      const tokenAbi = ['function balanceOf(address) view returns (uint256)'];
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
      const burnedSupply = Number(await tokenContract.balanceOf(walletAddress)) / 1e18
    
      const totalSupply = 69420
      client.user.setPresence({
        activities: [
          {
            name: `Burned Supply`,
            type: ActivityType.Watching,
          },
        ],
        status: "online",
      });

      client.guilds.cache.forEach(async (guild) => {
        try {
          const member = await guild.members.fetch(client.user.id);
          await member.setNickname(`${burnedSupply.toFixed(1)} | ${(burnedSupply * 100 / totalSupply).toFixed(1)}%`);
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

  client.login(process.env.TOKEN_BURNED);
}

start();
