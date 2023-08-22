import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { erc20ABI } from "wagmi";

export default function useApprove(
  amountIn: bigint | undefined,
  token: Address,
  spender: Address | null
) {
  const preparation = usePrepareContractWrite({
    address: token,
    abi: erc20ABI,
    enabled: spender != null && !spender.startsWith("0x0"),
    functionName: "approve",
    args: [
      spender ? spender : `0x`,
      amountIn ? amountIn : BigInt("1000000000000000000000000"),
    ],
    onError(err) {
      console.error(err);
    },
  });

  const transaction = useContractWrite({
    ...preparation.config,
    onError(err) {
      console.error(err);
    },
  });

  const confirmation = useWaitForTransaction({
    confirmations: 2,
    hash: transaction.data?.hash,
    onError(error) {
      console.error(error);
    },
    onSuccess() {},
  });

  return { confirmation, transaction };
}
