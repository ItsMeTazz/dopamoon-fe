import { useContractRead } from "wagmi";
import LPStakingABI from "../statics/abis/LPStakingABI.json";
import { formatEther } from "viem";
import { CHAIN_ID, DOPAMOON_ADDRESS, STAKING_CONTRACT } from "../statics/addresses";

export default function useDopaRewardData() {
  const { data } = useContractRead({
    abi: LPStakingABI,
    address: STAKING_CONTRACT,
    functionName: "getRewardRate",
    args: [DOPAMOON_ADDRESS],
    chainId: CHAIN_ID,
    watch: true,
  });

  return data ? Number(formatEther(data as bigint)) : 0;
}
