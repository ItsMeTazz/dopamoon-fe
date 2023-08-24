import { useContractRead } from "wagmi";
import swampABI from "../statics/abis/LPStakingABI.json";
import { formatEther } from "viem";
import { CHAIN_ID, STAKING_CONTRACT } from "../statics/addresses";

export default function useRewardRate() {
  const { data } = useContractRead({
    abi: swampABI,
    address: STAKING_CONTRACT,
    functionName: "rewardRate",
    chainId: CHAIN_ID,
  });

  return data ? formatEther(data as bigint) : 0;
}
