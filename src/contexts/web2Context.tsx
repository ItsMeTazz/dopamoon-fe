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
  ethPrice: Number;
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
      const req = await fetch(
        "https://api.dexscreener.com/latest/dex/pairs/avalanche/0x640a8a1ca1de9457d72896e5fecb1392dd9efdfa",
        { next: { revalidate: 10 } }
      );
      const priceData = await req.json();
      setDopaPrice(Number(priceData.pairs[0].priceUsd));

      const reqEth = await fetch(
        "https://api.dexscreener.com/latest/dex/pairs/avalanche/0xd446eb1660f766d533beceef890df7a69d26f7d1",
        { next: { revalidate: 10 } }
      );
      const priceDataEth = await reqEth.json();
      setBonePrice(Number(priceDataEth.pairs[0].priceUsd));
    }

    fetchPrices();
  }, []);

  return (
    <Web2Context.Provider
      value={{
        dopamoonPrice: dopaPrice,
        ethPrice: bonePrice,
      }}
    >
      {children}
    </Web2Context.Provider>
  );
}
