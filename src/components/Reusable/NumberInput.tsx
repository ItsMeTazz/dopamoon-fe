import { formatNumberToCurrency } from "@/src/statics/helpers/numberFormatter";
import logo from "@/src/statics/images/logo.png";
import Image from "next/image";

export default function NumberInput({
  tokenSymbol,
  value,
  unitPrice,
  balance,
  setValueCallback,
}: {
  tokenSymbol: string;
  value: string;
  unitPrice?: Number;
  balance?: string;
  setValueCallback?: (value: string) => void;
}) {
  return (
    <div className="mt-2 w-full flex items-center h-10 gap-2 bg-slate-500/40 rounded-md relative">
      <button className="relative min-w-[60px] flex items-center justify-center h-full hover:bg-ogre/10 border-r-[1px] border-slate-500/50">
        <Image alt={tokenSymbol} height={20} src={logo} />
      </button>

      <input
        disabled={!balance}
        value={value}
        onChange={(e) =>
          setValueCallback ? setValueCallback(e.target.value) : null
        }
        type="number"
        placeholder={balance ? `Enter ${tokenSymbol} amount` : "0"}
        className="pl-2 w-full outline-none bg-transparent"
      />
      {unitPrice != null && (
        <div>{formatNumberToCurrency(Number(value) * Number(unitPrice))}</div>
      )}

      {balance && (
        <button
          onClick={() => {
            setValueCallback ? setValueCallback(balance ? balance : "") : null;
          }}
          className="min-w-[60px] flex gap-2 hover:bg-ogre/10 border-l-[1px] border-slate-500/50 justify-center items-center relative whitespace-nowrap px-4 h-full transition-colors duration-500"
        >
          MAX
        </button>
      )}
    </div>
  );
}
