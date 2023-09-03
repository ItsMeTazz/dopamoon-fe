import { useAccount, useContractRead } from "wagmi";
import swampABI from "../statics/abis/redemptABI.json";
import { formatEther } from "viem";
import {
  CHAIN_ID,
  REDEMPTION_CONTRACT,
  STAKING_CONTRACT,
} from "../statics/addresses";

export default function useUserDeposits() {
  const { address } = useAccount();

  const { data } = useContractRead({
    abi: swampABI,
    address: REDEMPTION_CONTRACT,
    functionName: "deposits",
    args: [address],
    chainId: CHAIN_ID,
    watch: true,
  });

  return data ? Number(formatEther(data as bigint)).toFixed(3) : "0";
}
