import { erc20ABI, useBalance, useContractRead } from "wagmi";
import swampABI from "../statics/abis/LPStakingABI.json";
import { Address, formatEther } from "viem";
import { CHAIN_ID, LP_ADDRESS, WETH_ADDRESS } from "../statics/addresses";

export default function useLPPrice(ethPrice: Number) {
  const { data: ethBalanceInLp } = useContractRead({
    abi: erc20ABI,
    address: WETH_ADDRESS,
    functionName: "balanceOf",
    args: [LP_ADDRESS],
    chainId: CHAIN_ID,
  });

  const { data: lpTotalSupply } = useContractRead({
    abi: erc20ABI,
    address: LP_ADDRESS,
    functionName: "totalSupply",
    chainId: CHAIN_ID,
  });

  if (ethBalanceInLp && lpTotalSupply) {
    const marketCap =
      Number(formatEther(ethBalanceInLp)) * 2 * Number(ethPrice);
    const lpPrice = marketCap / Number(formatEther(lpTotalSupply as bigint));
    return lpPrice;
  }
  return 0;
}
