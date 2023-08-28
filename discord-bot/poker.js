require("dotenv").config();
const { ethers } = require("ethers");
const rpcUrl = "https://www.shibrpc.com/";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

const contractAddress = "0xf9b90C7F6715d26a026a8b5AC8449825FeddDBbe";
const contractABI = [
  {
    constant: false,
    inputs: [],
    name: "poke",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function start() {
  console.log("[Start]");
  poke();
  setInterval(async () => {
    console.log("in interval");
    poke();
  }, 300000);

  async function poke() {
    const privateKey = process.env.POKER;
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    try {
      const tx = await contract.poke();
      await tx.wait();
      console.log("Transaction receipt:", tx);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

start();
