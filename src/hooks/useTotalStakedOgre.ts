import { useContractRead } from "wagmi";
import swampABI from "../statics/abis/swamp.json";
import { formatEther } from "viem";
import { STAKING_CONTRACT } from "../statics/addresses";

export default function useTotalStakedOgre() {
  const { data } = useContractRead({
    abi: swampABI,
    address: STAKING_CONTRACT,
    functionName: "totalSupply",
    chainId: 8453,
    watch: true,
  });

  return data ? Number(formatEther(data as bigint)) : 0;
}
