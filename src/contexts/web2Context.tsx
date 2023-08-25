"use client";
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";

export type Web2ContextType = {
  dopamoonPrice: Number;
  bonePrice: Number;
};

export const Web2Context = createContext<Web2ContextType | null>(null);
export function useWeb2Context() {
  return useContext(Web2Context);
}

type Props = {
  children: ReactNode;
};

export default function Web2Provider({ children }: Props) {
  const [dopaPrice, setDopaPrice] = useState<Number>(0);
  const [bonePrice, setBonePrice] = useState<Number>(0);

  useEffect(() => {
    async function fetchPrices() {
      const query = {
        query: `
          {
            getTokenPrices(inputs: [
              { address: "0x9813037ee2218799597d83d4a5b6f3b6778218d9", networkId: 1 },
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
          "x-api-key": process.env.NEXT_PUBLIC_DEFINED_KEY
            ? process.env.NEXT_PUBLIC_DEFINED_KEY
            : "",
        },
        body: JSON.stringify(query),
      });

      const res = await reqResponse.json();

      setBonePrice(res.data.getTokenPrices[0].priceUsd);
      setDopaPrice(res.data.getTokenPrices[1].priceUsd);
      // const req = await fetch(
      //   "https://api.dexscreener.com/latest/dex/pairs/avalanche/0x640a8a1ca1de9457d72896e5fecb1392dd9efdfa",
      //   { next: { revalidate: 30 } }
      // );
      // const priceData = await req.json();
      // setDopaPrice(Number(priceData.pairs[0].priceUsd));

      // const reqEth = await fetch(
      //   "https://api.dexscreener.com/latest/dex/pairs/ethereum/0xb011e4eb4111ef00b620a5ed195836dcd69db1ff",
      //   { next: { revalidate: 30 } }
      // );
      // const priceDataEth = await reqEth.json();
      // setBonePrice(Number(priceDataEth.pairs[0].priceUsd));
    }

    fetchPrices();
  }, []);

  return (
    <Web2Context.Provider
      value={{
        dopamoonPrice: dopaPrice,
        bonePrice: bonePrice,
      }}
    >
      {children}
    </Web2Context.Provider>
  );
}
