import { useAccount, useBalance } from "wagmi";
import { DOPAMOON_ADDRESS } from "../statics/addresses";

export default function useDeadSupply() {
  const { data } = useBalance({
    address: "0x000000000000000000000000000000000000dEaD",
    token: DOPAMOON_ADDRESS,
    watch: true,
  });
  return data;
}
