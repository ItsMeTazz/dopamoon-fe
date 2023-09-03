import { Address } from "viem";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import swampABI from "../statics/abis/redemptABI.json";
import { REDEMPTION_CONTRACT, STAKING_CONTRACT } from "../statics/addresses";

export default function useDeposit(amountIn: BigInt, enabled: boolean) {
  const preparation = usePrepareContractWrite({
    address: REDEMPTION_CONTRACT as Address,
    abi: swampABI,
    enabled: enabled,
    functionName: "deposit",
    args: [amountIn],
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
  });

  return { confirmation, transaction };
}
