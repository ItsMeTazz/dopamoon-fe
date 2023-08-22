import { useContractRead } from "wagmi";
import swampABI from "../statics/abis/swamp.json";
import { formatEther } from "viem";
import { OGRE_ADDRESS, SWAMP_ADDRESS } from "../statics/addresses";

export default function useRewardRate() {
  const { data } = useContractRead({
    abi: swampABI,
    address: SWAMP_ADDRESS,
    functionName: "rewardData",
    args: [OGRE_ADDRESS],
    chainId: 8453,
    watch: true,
  });

  return data ? Number(formatEther((data as any)[3])) : 0;
}
