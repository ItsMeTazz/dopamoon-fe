import { erc20ABI, useContractRead } from "wagmi";
import { formatEther } from "viem";
import { DOPAMOON_ADDRESS } from "../statics/addresses";

export default function useTotalSupply() {
  const { data } = useContractRead({
    abi: erc20ABI,
    address: DOPAMOON_ADDRESS,
    functionName: "totalSupply",
    chainId: 8453,
    watch: true,
  });

  return data ? Number(formatEther(data as bigint)) : 0;
}
