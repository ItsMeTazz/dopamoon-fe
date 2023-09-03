import { Address, useAccount, useBalance } from "wagmi";
import { REDEMPTION_CONTRACT } from "../statics/addresses";

export default function useContractBalance(token: string | undefined) {
  const { data } = useBalance({
    address: REDEMPTION_CONTRACT,
    token: token ? (token as Address) : undefined,
    watch: true,
  });
  return data;
}
