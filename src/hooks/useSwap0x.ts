import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";

export default function useSwap0x(quote: any) {
  const { config } = usePrepareSendTransaction({
    ...quote,
  });

  const { isLoading, data, sendTransaction, isSuccess, status } =
    useSendTransaction(config);
  return { isSuccess, isLoading, sendTransaction, status };
}
