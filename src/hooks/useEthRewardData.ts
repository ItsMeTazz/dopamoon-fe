import { useContractRead } from "wagmi";
import swampABI from "../statics/abis/swamp.json";
import { formatEther } from "viem";
import { SWAMP_ADDRESS, WETH_ADDRESS } from "../statics/addresses";

export default function useEthRewardRate() {
  const { data } = useContractRead({
    abi: swampABI,
    address: SWAMP_ADDRESS,
    functionName: "rewardData",
    args: [WETH_ADDRESS],
    chainId: 8453,
    watch: true,
  });

  return data ? Number(formatEther((data as any)[3])) : 0;
}
