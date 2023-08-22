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
  // ethPrice: Number;
};

export const Web2Context = createContext<Web2ContextType | null>(null);
export function useWeb2Context() {
  return useContext(Web2Context);
}

type Props = {
  children: ReactNode;
};

export default function Web2Provider({ children }: Props) {
  const [ogrePrice, setOgrePrice] = useState<Number>(0);
  // const [ethPrice, setEthPrice] = useState<Number>(0);

  useEffect(() => {
    async function fetchPrices() {
      const req = await fetch(
        "https://api.dexscreener.com/latest/dex/pairs/base/0xbb2a2d17685c3bc715687fa4f66f68999f59c7",
        { next: { revalidate: 10 } }
      );
      const priceData = await req.json();
      setOgrePrice(Number(priceData.pairs[0].priceUsd));

      // const reqEth = await fetch(
      //   "https://api.dexscreener.com/latest/dex/pairs/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640",
      //   { next: { revalidate: 10 } }
      // );
      // const priceDataEth = await reqEth.json();
      // setEthPrice(Number(priceDataEth.pairs[0].priceUsd));
    }

    fetchPrices();
  }, []);

  return (
    <Web2Context.Provider
      value={{
        dopamoonPrice: ogrePrice,
        // ethPrice: ethPrice,
      }}
    >
      {children}
    </Web2Context.Provider>
  );
}
