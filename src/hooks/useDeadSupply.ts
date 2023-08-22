import { useAccount, useBalance } from "wagmi";
import { OGRE_ADDRESS } from "../statics/addresses";

export default function useDeadSupply() {
  const { data } = useBalance({
    address: "0x000000000000000000000000000000000000dead",
    token: OGRE_ADDRESS,
    watch: true,
  });
  return data;
}
