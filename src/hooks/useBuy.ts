import { usePrepareSendTransaction, useSendTransaction } from "wagmi";

export default function useSwap(buyTX: any) {
  const { config, status } = usePrepareSendTransaction({
    enabled: buyTX != null,
    ...buyTX,
  });
  const { isLoading, sendTransaction } = useSendTransaction(config);

  return { status, isLoading, sendTransaction };
}
