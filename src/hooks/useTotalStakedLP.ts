import { useContractRead } from "wagmi";
import swampABI from "../statics/abis/LPStakingABI.json";
import { formatEther } from "viem";
import { CHAIN_ID, STAKING_CONTRACT } from "../statics/addresses";

export default function useTotalStakedLP() {
  const { data } = useContractRead({
    abi: swampABI,
    address: STAKING_CONTRACT,
    functionName: "totalSupply",
    chainId: CHAIN_ID,
    watch: true,
  });

  return data ? Number(formatEther(data as bigint)) : 0;
}
