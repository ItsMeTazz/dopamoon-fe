import { useAccount, useBalance } from "wagmi";
import { DEAD_ADDRESS, DOPAMOON_ADDRESS } from "../statics/addresses";

export default function useDeadSupply() {
  const { data } = useBalance({
    address: DEAD_ADDRESS,
    token: DOPAMOON_ADDRESS,
    watch: true,
  });
  return data;
}
