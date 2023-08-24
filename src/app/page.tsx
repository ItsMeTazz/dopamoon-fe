"use client";
import { motion } from "framer-motion";
import { GiBurningMeteor, GiCoins, GiRocket } from "react-icons/gi";
import useDeadSupply from "../hooks/useDeadSupply";
import useTotalSupply from "../hooks/useTotalSupply";

export default function Home() {
  const deadSupply = useDeadSupply();
  const totalSupply = useTotalSupply();

  return (
    <section className="relative z-10 w-full px-4 md:px-7 flex">
      <motion.div
        initial={{ scale: 1.05, opacity: 0, translateY: "-20px" }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full flex items-end gap-2 md:gap-4 justify-between"
      >
        <motion.div
          initial={{ translateX: "-1000px" }}
          animate={{ translateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center h-full mt-0 md:mt-16 w-full"
        >
          <h1 className="relative text-[7vw] md:text-[4vw] whitespace-nowrap font-bold flex items-center gap-2 md:gap-4">
            <div>
              $DOPA<span className="text-moon">MOON</span>
            </div>

            <motion.div
              animate={{ transform: "translate(1000px, -1000px) scale(5)" }}
              transition={{ delay: 3.5, duration: 2, ease: [0.8, 0, 0.58, 1] }}
              className="absolute left-full top-1/4 scale-100"
            >
              <GiRocket className="text-[#cb5f18] -rotate-90" />
            </motion.div>
          </h1>
          <div className="text-5xl">
            <span className="text-moon">LAUNCHING</span>SOON
          </div>
          <div className="text-center text-xl mt-5">
            $DOPA is your one-way ticket to the moon. Get your dose of $DOPAmine
            today and fasten your seatbelt.
            <br />A 5% sell-tax based deflationary rocket that will make your
            portfolio go 10000x.
          </div>

          <div className="flex gap-5 mt-5">
            {/* <Link
              href="/ogregator"
              className="bg-moon rounded-md gap-2 transition-transform relative flex justify-center items-center px-10 h-12"
            >
              Buy DOPA
            </Link>
            <Link
              href="/stake"
              className="bg-moon-2 rounded-md gap-2 transition-transform relative flex justify-center items-center px-10 h-12"
            >
              Stake DOPA
            </Link> */}
          </div>

          <div className="flex gap-10 mt-5">
            <a
              //href="https://basescan.org/token/0xab8a1c03b8e4e1d21c8ddd6edf9e07f26e843492?a=0x000000000000000000000000000000000000dead"
              target="_blank"
              className="flex gap-2"
            >
              <GiBurningMeteor size={45} className="text-[#cb5f18]" />
              <div className="flex flex-col">
                <div>$DOPA BURNED</div>
                <div className="text-[#cb5f18] font-bold">
                  {deadSupply && (
                    <div className="">
                      {Number(deadSupply?.formatted).toFixed(4)} /{" "}
                      {Number(
                        (Number(deadSupply?.formatted) * 100) / 1_000_000
                      ).toFixed(2)}
                      %
                    </div>
                  )}
                </div>
              </div>
            </a>
            <a className="flex gap-2">
              <GiCoins size={45} className="text-moon font-bold" />
              <div className="flex flex-col">
                <div>$DOPA TOTAL SUPPLY</div>
                <div className="text-moon">
                  {totalSupply && deadSupply && (
                    <div className="">
                      {(
                        Number(totalSupply) - Number(deadSupply.formatted)
                      ).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
