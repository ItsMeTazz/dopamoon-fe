import { useAccount, useContractRead } from "wagmi";
import swampABI from "../statics/abis/swamp.json";
import { formatEther } from "viem";
import { DOPAMOON_ADDRESS, STAKING_CONTRACT } from "../statics/addresses";

export default function usePendingRewards() {
  const { address } = useAccount();

  const { data } = useContractRead({
    abi: swampABI,
    address: STAKING_CONTRACT,
    functionName: "rewards",
    args: [address, DOPAMOON_ADDRESS],
    chainId: 8453,
    watch: true,
  });

  return data ? Number(formatEther(data as bigint)).toFixed(4) : '0';
}
