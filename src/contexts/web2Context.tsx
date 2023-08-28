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
  shexPrice: Number;
  shexPerDay: Number;
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
  const [shexPrice, setShexPrice] = useState<Number>(0);
  const [shexPerDay, setShexPerDay] = useState<Number>(0);

  useEffect(() => {
    async function fetchPrices() {
      const req = await fetch(
        "https://api.dexscreener.com/latest/dex/pairs/shibarium/0x4a89dbcf583f899371ca9dacd9a9840202caf160",
        { next: { revalidate: 10 } }
      );
      const priceData = await req.json();
      setDopaPrice(Number(priceData.pairs[0].priceUsd));

      const reqEth = await fetch(
        "https://api.dexscreener.com/latest/dex/pairs/ethereum/0xb011e4eb4111ef00b620a5ed195836dcd69db1ff",
        { next: { revalidate: 10 } }
      );
      const priceDataEth = await reqEth.json();
      setBonePrice(Number(priceDataEth.pairs[0].priceUsd));

      const reqShex = await fetch(
        "https://api.dexscreener.com/latest/dex/pairs/shibarium/0x21de8c93e07ae5200d370391a244178a6bf426b2",
        { next: { revalidate: 10 } }
      );
      const priceDataShex = await reqShex.json();
      setShexPrice(Number(priceDataShex.pairs[0].priceUsd));

      const shexReq = await fetch(
        "https://fourdex-api-production.up.railway.app/api/shibbex"
      );
      const shexPerDayResponse = await shexReq.json();
      setShexPerDay(
        shexPerDayResponse.farms.find((farm: any) => farm.id === 2).shexPerDay
      );
    }

    fetchPrices();
  }, []);

  return (
    <Web2Context.Provider
      value={{
        dopamoonPrice: dopaPrice,
        bonePrice: bonePrice,
        shexPerDay: shexPerDay, 
        shexPrice: shexPrice
      }}
    >
      {children}
    </Web2Context.Provider>
  );
}
