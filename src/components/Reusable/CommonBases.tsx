import { Token, tokens } from "@/src/statics/tokens";

export default function CommonBases({
  onSelect,
}: {
  onSelect: (token: Token) => void;
}) {
  const weth = tokens.find((token: Token) => token.symbol === "WETH");
  const eth = tokens.find((token: Token) => token.symbol === "ETH");
  const ogre = tokens.find((token: Token) => token.symbol === "OGRE");
  const commonTokens = [ogre, eth, weth];

  return (
    <div className="w-full">
      <h1 className="text">Common Tokens</h1>
      <div className="mt-2 w-full flex flex-wrap items-center gap-4">
        {commonTokens.map((token) => (
          <div
            onClick={() => onSelect(token!)}
            key={token?.symbol}
            className="rounded-lg h-10 px-2 flex items-center gap-2 cursor-pointer bg-[#3C3C35] hover:border-[1px] border-green"
          >
            <img
              className="h-[30px] aspect-auto rounded-full"
              src={token?.logoURI}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = "/tokens/unknown.png";
              }}
            />
            {token?.symbol}
          </div>
        ))}
      </div>
    </div>
  );
}
