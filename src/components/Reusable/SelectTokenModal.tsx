import { Token, tokens } from "@/src/statics/tokens";
import { SetStateAction, useEffect, useState } from "react";
import CommonBases from "./CommonBases";
import { AiFillCloseCircle, AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";

export default function AssetSelect({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (token: Token) => void;
}) {
  const [search, setSearch] = useState("");
  const [filteredAssetOptions, setFilteredAssetOptions] = useState<Token[]>([]);

  const openSearch = () => {
    setSearch("");
  };

  useEffect(() => {
    async function asyncAssetOptions() {
      let ao = tokens.filter((token) => {
        if (search && search !== "") {
          return (
            token.address.toLowerCase().includes(search.toLowerCase()) ||
            token.symbol.toLowerCase().includes(search.toLowerCase()) ||
            token.name.toLowerCase().includes(search.toLowerCase())
          );
        } else {
          return true;
        }
      });

      setFilteredAssetOptions(ao);

      return () => {};
    }

    asyncAssetOptions();
  }, [search]);

  const onSearchChanged = async (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

  const renderAssetOption = (token: Token, idx: number) => {
    return (
      <div
        key={token.address + "_" + idx}
        className="w-full flex justify-between items-center gap-4 cursor-pointer hover:bg-glacier-input rounded-lg p-2"
        onClick={() => {
          onSelect(token);
        }}
      >
        <div className="flex items-center gap-2">
          <img
            alt={token.symbol}
            className="h-[40px] aspect-square rounded-full"
            src={token.logoURI ? token.logoURI : ""}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = "/tokens/unknown.png";
            }}
          />

          <div className="">
            <div>{token ? token.symbol : ""}</div>
            <div className="text-xs">{token ? token.name : ""}</div>
          </div>
        </div>

        {/* <div className={classes.assetSelectBalance}>
          {token && token.balance ? formatCurrency(token.balance) : "0.00"}
          <Typography variant="subtitle1" color="textSecondary">
            {"Balance"}
          </Typography>
        </div> */}
      </div>
    );
  };

  const filteredAssets = () => {
    return filteredAssetOptions
      .sort((a, b) => {
        if (a.symbol.toLowerCase() < b.symbol.toLowerCase()) return -1;
        if (a.symbol.toLowerCase() > b.symbol.toLowerCase()) return 1;
        return 0;
      })
      .map((asset: Token, idx: number) => {
        return renderAssetOption(asset, idx);
      });
  };

  const renderOptions = () => {
    return (
      <div className="mt-4 h-full w-full">
        <div className="flex gap-2 items-center bg-[#3c3c35] rounded-md">
          <div className="w-full bg-glacier-input rounded-xl flex items-center gap-4 py-2 px-4 h-12">
            <AiOutlineSearch size={25} />
            <input
              type="text"
              className="w-full h-full bg-transparent outline-none"
              placeholder="OGRE, ETH, WETH, 0x..."
              value={search}
              onChange={onSearchChanged}
            />
          </div>
        </div>

        <div className="h-[435px] overflow-y-scroll p-2 mt-2">
          {filteredAssets()}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-screen backdrop-blur-md z-50 flex justify-center items-center">
      <div className="h-[calc(100vh-50px)] w-[600px] bg-dark rounded-md border-[1px] border-green p-5">
        <div className="flex justify-between items-center">
          <div className="text-green text-lg">Select Token</div>
          <AiFillCloseCircle
            size={30}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-6 h-full font-sans">
          <CommonBases onSelect={onSelect} />
          {renderOptions()}
        </div>
      </div>
    </div>
  );
}
