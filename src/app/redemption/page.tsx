"use client";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import Image from "next/image";
import NumberInput from "@/src/components/Reusable/NumberInput";
import { Address, parseEther } from "viem";
import useTokenBalance from "@/src/hooks/useTokenBalance";
import useAllowance from "@/src/hooks/useAllowance";
import useApprove from "@/src/hooks/useApprove";
import { DOPAMOON_ADDRESS, REDEMPTION_CONTRACT } from "@/src/statics/addresses";
import logo from "@/src/statics/images/logo.png";
import useDeposit from "@/src/hooks/useDeposit";
import useUserDeposits from "@/src/hooks/useUserDeposits";
import useContractBalance from "@/src/hooks/useContractBalance";

export default function Redemption() {
  const [value, setValue] = useState("");

  const dopaBalance = useTokenBalance(DOPAMOON_ADDRESS);

  const amountIn = useMemo(() => parseEther(value as `${number}`), [value]);

  const dopaAllowance = useAllowance(
    DOPAMOON_ADDRESS as Address,
    REDEMPTION_CONTRACT
  );
  const approveLPTX = useApprove(
    amountIn,
    DOPAMOON_ADDRESS as Address,
    REDEMPTION_CONTRACT
  );

  const userDeposits = useUserDeposits();
  const totalDeposits = useContractBalance(DOPAMOON_ADDRESS);
  const stakeTX = useDeposit(amountIn, amountIn > 0 && dopaAllowance > 0);

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
            <div className="text-xl font-bold text-center">
              DOPA redemption for future THRO
            </div>
            <div className="mt-6">Your deposits: {userDeposits} DOPA</div>
            {totalDeposits && (
              <div className="mt-6">
                Total deposits: {Number(totalDeposits?.formatted).toFixed(4)} DOPA
              </div>
            )}
            <div className="mt-6">
              <div className="w-full justify-between flex">
                <div className="flex gap-1">
                  <div>In Wallet:</div>
                  <div className="font-bold">
                    {dopaBalance
                      ? Number(dopaBalance.formatted).toFixed(4)
                      : "0"}
                    DOPA
                  </div>
                </div>
              </div>

              <NumberInput
                tokenSymbol="DOPA"
                value={value}
                balance={dopaBalance ? dopaBalance.formatted : "0"}
                setValueCallback={setValue}
                unitPrice={0}
              />
              <div className="mt-6 w-full flex justify-between gap-6 font-bold">
                {amountIn > 0 && dopaAllowance < amountIn ? (
                  <button
                    disabled={!approveLPTX.transaction.write || !value}
                    onClick={() => {
                      if (approveLPTX.transaction.write) {
                        approveLPTX.transaction.write();
                      }
                    }}
                    className="disabled:contrast-50 bg-moon rounded-md w-full gap-2 transition-transform relative flex justify-center items-center px-4 h-12"
                  >
                    {approveLPTX.confirmation.isLoading
                      ? "APPROVING"
                      : "APPROVE"}
                  </button>
                ) : (
                  <button
                    disabled={
                      !stakeTX.transaction.write ||
                      !value ||
                      (dopaBalance && amountIn > dopaBalance.value)
                    }
                    onClick={() => {
                      if (stakeTX.transaction.write) {
                        stakeTX.transaction.write();
                      }
                    }}
                    className="disabled:contrast-50 flex-col bg-moon rounded-md w-full transition-transform relative flex justify-center items-center px-4 h-12 "
                  >
                    {stakeTX.confirmation.isLoading ? "DEPOSITING" : "DEPOSIT"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
