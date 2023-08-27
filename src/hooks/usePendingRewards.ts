import { useAccount, useContractRead } from "wagmi";
import swampABI from "../statics/abis/LPStakingABI.json";
import { formatEther } from "viem";
import {
  CHAIN_ID,
  STAKING_CONTRACT,
} from "../statics/addresses";

export default function usePendingRewards(rewardTokenAddress: string) {
  const { address } = useAccount();

  const { data } = useContractRead({
    abi: swampABI,
    address: STAKING_CONTRACT,
    functionName: "earned",
    args: [address, rewardTokenAddress],
    chainId: CHAIN_ID,
    watch: true,
  });

  return data ? Number(formatEther(data as bigint)).toFixed(3) : "0";
}
