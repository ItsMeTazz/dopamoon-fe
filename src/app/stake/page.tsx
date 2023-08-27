"use client";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import Image from "next/image";
import NumberInput from "@/src/components/Reusable/NumberInput";
import { Address, parseEther } from "viem";
import useTokenBalance from "@/src/hooks/useTokenBalance";
import { useWeb2Context } from "@/src/contexts/web2Context";
import useAllowance from "@/src/hooks/useAllowance";
import useApprove from "@/src/hooks/useApprove";
import { LP_ADDRESS, STAKING_CONTRACT } from "@/src/statics/addresses";
import useStake from "@/src/hooks/useStake";
import useWithdraw from "@/src/hooks/useWithdraw";
import { formatNumberToCurrency } from "@/src/statics/helpers/numberFormatter";
import usePendingRewards from "@/src/hooks/usePendingRewards";
import useClaim from "@/src/hooks/useClaim";
import logo from "@/src/statics/images/logo.png";
import lpLogo from "@/src/statics/images/lp.png";
import useRewardRate from "@/src/hooks/useRewardRate";
import useTotalStakedLP from "@/src/hooks/useTotalStakedLP";
import useUserStakedLP from "@/src/hooks/useUserStakedLP";
import useLPPrice from "@/src/hooks/useLPPrice";

export default function Stake() {
  const [action, setAction] = useState("stake");
  const [value, setValue] = useState("");

  const web2Context = useWeb2Context();
  const dopaLPBalance = useTokenBalance(LP_ADDRESS);

  const totalStakedLP = useTotalStakedLP();
  const userStakedLP = useUserStakedLP();
  const pendingRewards = usePendingRewards();
  const rewardRate = useRewardRate();
  const lpPrice = useLPPrice(
    web2Context && web2Context.bonePrice ? Number(web2Context.bonePrice) : 0
  );

  const apr = useMemo(() => {
    if (web2Context && web2Context.dopamoonPrice) {
      const userLPTokensValue = (userStakedLP ? userStakedLP : 1) * lpPrice;
      const totalRewardsValue =
        (Number(rewardRate) *
          60 *
          60 *
          24 *
          365 *
          (userStakedLP ? userStakedLP : 1) *
          Number(web2Context.dopamoonPrice)) /
        totalStakedLP;
      return ((totalRewardsValue / userLPTokensValue) * 100).toFixed(0);
    }
    return 0;
  }, [lpPrice, userStakedLP, rewardRate, web2Context, totalStakedLP]);

  const amountIn = useMemo(() => parseEther(value as `${number}`), [value]);

  const dopaAllowance = useAllowance(LP_ADDRESS as Address, STAKING_CONTRACT);
  const approveLPTX = useApprove(
    amountIn,
    LP_ADDRESS as Address,
    STAKING_CONTRACT
  );

  const stakeTX = useStake(
    amountIn,
    action === "stake" && amountIn > 0 && dopaAllowance > 0
  );
  const withdrawTX = useWithdraw(
    amountIn,
    action === "withdraw" && amountIn > 0
  );
  const claimTX = useClaim(Number(pendingRewards) > 0);

  return (
    <section className="relative z-10 w-full flex items-center">
      <motion.div
        initial={{ scale: 1.05, opacity: 0, translateY: "-20px" }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full flex justify-center"
      >
        <div className="flex w-full max-w-3xl">
          <div
            className={`w-full border-[1px] backdrop-blur-sm border-slate-100/20 rounded-md bg-dark p-6 font-sans`}
          >
            <div className="text-3xl font-bold text-moon text-center">
              OPENING SOON!
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
