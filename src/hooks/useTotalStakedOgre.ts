import { useContractRead } from "wagmi";
import swampABI from "../statics/abis/swamp.json";
import { formatEther } from "viem";
import { SWAMP_ADDRESS } from "../statics/addresses";

export default function useTotalStakedOgre() {
  const { data } = useContractRead({
    abi: swampABI,
    address: SWAMP_ADDRESS,
    functionName: "totalSupply",
    chainId: 8453,
    watch: true,
  });

  return data ? Number(formatEther(data as bigint)) : 0;
}
