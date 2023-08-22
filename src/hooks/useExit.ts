import { Address } from "viem";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import swampABI from "../statics/abis/swamp.json";
import { SWAMP_ADDRESSV1 } from "../statics/addresses";

export default function useExit() {
  const preparation = usePrepareContractWrite({
    address: SWAMP_ADDRESSV1 as Address,
    abi: swampABI,
    functionName: "exit",
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
