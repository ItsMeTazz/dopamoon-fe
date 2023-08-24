const axios = require("axios");

async function getPriceData(url) {
  try {
    const response = await axios.get(url);
    const priceData = response.data;
    return priceData;
  } catch (e) {
    console.error("Failed to fetch price for " + url);
    console.error(e);
  }
  return;
}

function getPriceOnPair(priceData) {
  return Number(priceData.pairs[0].priceUsd).toFixed(2);
}

function getH1PriceChangeOnPair(priceData) {
  return Number(priceData.pairs[0].priceChange.h1);
}

module.exports = {
  getPriceData,
  getPriceOnPair,
  getH1PriceChangeOnPair
};
