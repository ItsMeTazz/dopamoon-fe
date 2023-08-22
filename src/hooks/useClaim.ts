import { Address } from "viem";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import swampABI from "../statics/abis/swamp.json";
import { STAKING_CONTRACT } from "../statics/addresses";

export default function useClaim(enabled: boolean) {
  const preparation = usePrepareContractWrite({
    address: STAKING_CONTRACT as Address,
    abi: swampABI,
    enabled: enabled,
    functionName: "getReward",
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
