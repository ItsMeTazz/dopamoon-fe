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
        "https://api.dexscreener.com/latest/dex/pairs/shibarium/0x4a89dbcf583f899371ca9dacd9a9840202caf160",
        { next: { revalidate: 10 } }
      );
      const priceData = await req.json();
      setDopaPrice(Number(priceData.pairs[0].priceUsd));

      const reqEth = await fetch(
        "https://api.dexscreener.com/latest/dex/pairs/shibarium/0x59bffa3e7b23bd0eacf1ba03a8865ebf1f085263",
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
