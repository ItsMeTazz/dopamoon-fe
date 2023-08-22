import { useAccount, useFeeData } from "wagmi";

export default async function quoteSwap(
  address: string | undefined,
  gasPrice: bigint | null,
  amountIn: bigint,
  tokenIn: string,
  tokenOut: string
) {
  console.log("[quote]");
  console.log("address", address);
  console.log("amount", amountIn.toString());
  console.log("gasPrice", gasPrice?.toString());
  if (address && gasPrice) {
    const body = {
      chainId: 43114, //8453,
      inputTokens: [
        {
          tokenAddress: "0x3712871408a829C5cd4e86DA1f4CE727eFCD28F6", //tokenIn,
          amount: amountIn.toString(),
        },
      ],
      outputTokens: [
        {
          tokenAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", //tokenOut,
          proportion: 1,
        },
      ],
      gasPrice: gasPrice.toString(),
      userAddr: address,
      slippageLimitPercent: 2,
      sourceBlacklist: [],
      sourceWhitelist: ["Wrapped AVAX", "Glacier Volatile", "Glacier Stable"],
      simulate: true,
      pathVizImage: false,
      // pathVizImageConfig: {
      //   nodeColor: "#383D51",
      //   legendTextColor: "#fff",
      // },
      disableRFQs: false,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const quoteReq = await fetch(
      "https://api.odos.xyz/sor/quote",
      requestOptions
    );
    const quoteData = await quoteReq.json();
    if (quoteReq.ok) {
      const routerReq = await fetch(
        "https://api.odos.xyz/info/router/v1/43114"
      );
      const routerResponse = await routerReq.json();
      const routerAddress = routerResponse.address;
      return { quote: quoteData as any, router: routerAddress };
    }
  }
  return { quote: null, router: null };
}
