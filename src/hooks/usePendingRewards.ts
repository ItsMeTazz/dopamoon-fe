import { useAccount, useContractRead } from "wagmi";
import swampABI from "../statics/abis/swamp.json";
import { formatEther } from "viem";
import { OGRE_ADDRESS, SWAMP_ADDRESS } from "../statics/addresses";

export default function usePendingRewards() {
  const { address } = useAccount();

  const { data } = useContractRead({
    abi: swampABI,
    address: SWAMP_ADDRESS,
    functionName: "rewards",
    args: [address, OGRE_ADDRESS],
    chainId: 8453,
    watch: true,
  });

  return data ? Number(formatEther(data as bigint)).toFixed(4) : '0';
}
