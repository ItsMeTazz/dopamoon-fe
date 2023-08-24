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
    web2Context && web2Context.ethPrice ? Number(web2Context.ethPrice) : 0
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
  const approveDopaTX = useApprove(
    amountIn,
    LP_ADDRESS as Address,
    STAKING_CONTRACT
  );

  const stakeTX = useStake(amountIn, action === "stake" && amountIn > 0 && dopaAllowance > 0);
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
            <div className="w-full flex justify-center gap-6 font-bold">
              <button
                className={`${
                  action === "stake" ? "bg-moon" : "bg-slate-500"
                } rounded-md px-4 py-2`}
                onClick={() => setAction("stake")}
              >
                Stake
              </button>
              <button
                className={`${
                  action === "withdraw" ? "bg-moon-2" : "bg-slate-500"
                } rounded-md px-4 py-2`}
                onClick={() => setAction("withdraw")}
              >
                Withdraw
              </button>
              {/* <button
                disabled={!exitTX.transaction.write}
                onClick={() => {
                  if (exitTX.transaction.write) {
                    exitTX.transaction.write();
                  }
                }}
                className="disabled:contrast-50 flex-col bg-moon-2 rounded-md w-52 transition-transform relative flex justify-center items-center px-4 h-12 text-black"
              >
                {exitTX.confirmation.isLoading ? "EXITING" : "EXIT v1"}
                <div className="text-xs">Claim rewards & withdraw funds</div>
              </button> */}
            </div>
            <div className="mt-6 w-full justify-between flex items-center">
              <div className="flex">
                <div className="flex flex-col font-sans">
                  Total Staked DOPA/WETH LP
                  <div className="flex gap-2 items-center">
                    <Image
                      src={logo}
                      height={25}
                      alt="OGRE"
                      className="bg-white/20 rounded-full p-0.5"
                    />
                    <div className="font-bold">{totalStakedLP.toFixed(4)}</div>
                    <div>
                      {lpPrice && (
                        <span>
                          ({formatNumberToCurrency(totalStakedLP * lpPrice)})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div>Your Staked DOPA/WETH LP</div>
                <div className="flex gap-2 items-center">
                  <Image
                    src={logo}
                    height={25}
                    alt="DOPA"
                    className="bg-white/20 rounded-full p-0.5"
                  />
                  <div className="font-bold">{userStakedLP.toFixed(4)}</div>
                  <div>
                    {lpPrice && (
                      <span>
                        ({formatNumberToCurrency(userStakedLP * lpPrice)})
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div>APR</div>
                <div className="font-bold">{apr}%</div>
                {/* <div className="font-bold">WETH: {ethApr}%</div> */}
                {/* <div className="text-xs">Paused. Migrating contracts</div> */}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex gap-1">
                <div>{action === "stake" ? "In Wallet" : "Staked"}:</div>
                <div className="font-bold">
                  {action === "stake"
                    ? dopaLPBalance
                      ? Number(dopaLPBalance.formatted).toFixed(4)
                      : "0"
                    : userStakedLP.toFixed(4)}{" "}
                  DOPA/WETH LP
                </div>
              </div>
              <NumberInput
                tokenSymbol="DOPA"
                value={value}
                balance={
                  action === "stake"
                    ? dopaLPBalance
                      ? dopaLPBalance.formatted
                      : "0"
                    : userStakedLP.toFixed(4)
                }
                setValueCallback={setValue}
                unitPrice={
                  web2Context && web2Context.dopamoonPrice
                    ? web2Context.dopamoonPrice
                    : 0
                }
              />
              <div className="mt-6 w-full flex justify-between gap-6 font-bold">
                {action === "stake" ? (
                  <>
                    {amountIn > 0 && dopaAllowance < amountIn ? (
                      <button
                        disabled={!approveDopaTX.transaction.write || !value}
                        onClick={() => {
                          if (approveDopaTX.transaction.write) {
                            approveDopaTX.transaction.write();
                          }
                        }}
                        className="disabled:contrast-50 bg-moon rounded-md w-full gap-2 transition-transform relative flex justify-center items-center px-4 h-12"
                      >
                        {approveDopaTX.confirmation.isLoading
                          ? "APPROVING"
                          : "APPROVE"}
                      </button>
                    ) : (
                      <button
                        disabled={
                          !stakeTX.transaction.write ||
                          !value ||
                          (dopaLPBalance && amountIn > dopaLPBalance.value)
                        }
                        onClick={() => {
                          if (stakeTX.transaction.write) {
                            stakeTX.transaction.write();
                          }
                        }}
                        className="disabled:contrast-50 flex-col bg-moon rounded-md w-full transition-transform relative flex justify-center items-center px-4 h-12 "
                      >
                        {stakeTX.confirmation.isLoading ? "STAKING" : "STAKE"}
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    disabled={!withdrawTX.transaction.write || !value}
                    onClick={() => {
                      if (withdrawTX.transaction.write) {
                        withdrawTX.transaction.write();
                      }
                    }}
                    className="disabled:contrast-50 flex-col bg-moon-2 rounded-md w-full transition-transform relative flex justify-center items-center px-4 h-12 "
                  >
                    WITHDRAW
                  </button>
                )}
                <button
                  disabled={!claimTX.transaction.write}
                  onClick={() => {
                    if (claimTX.transaction.write) {
                      claimTX.transaction.write();
                    }
                  }}
                  className={`disabled:contrast-50 disabled:cursor-not-allowed border-[1px] ${
                    action === "stake"
                      ? "border-moon text-moon"
                      : "border-moon-2 text-moon-2"
                  } rounded-md w-full flex-col transition-transform relative flex justify-center items-center px-4 h-12 `}
                >
                  <div className="z-10 flex gap-2">
                    CLAIM {pendingRewards} $DIPA
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
