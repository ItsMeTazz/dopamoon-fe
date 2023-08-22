import { Address, useAccount, useContractRead } from "wagmi";
import { parseEther } from "viem";
import { erc20ABI } from "wagmi";

export default function useAllowance(
  tokenIn: Address,
  spender: Address | null) {
  const { address } = useAccount();

  const { data } = useContractRead({
    address: tokenIn as Address,
    abi: erc20ABI,
    functionName: "allowance",
    enabled: spender != null && !spender.startsWith('0x0'),
    args: [address as Address, spender ? spender : `0x`],
    watch: true,
  });

  return data ? (data as bigint) : parseEther("0");
}
