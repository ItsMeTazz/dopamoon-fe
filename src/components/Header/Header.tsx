"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useWeb2Context } from "@/src/contexts/web2Context";
import { BsDiscord, BsTwitter } from "react-icons/bs";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "@/src/statics/images/logo.png";
import useTokenBalance from "@/src/hooks/useTokenBalance";
import { DOPAMOON_ADDRESS } from "@/src/statics/addresses";
import { GiWallet } from "react-icons/gi";

export default function Header() {
  const web2Context = useWeb2Context();
  const dopaBalance = useTokenBalance(DOPAMOON_ADDRESS);

  function nav() {
    return (
      <nav className="uppercase w-full h-full flex flex-col md:flex-row justify-end items-center gap-0 md:gap-4">
        <a
          href="https://shibbex.com/swap?chainId=109&inputCurrency=ETH&outputCurrency=0xB0cb6dE25BFc5811E323DBF0495d9BA6A154f43a"
          target="_blank"
          className="hover:underline hover:text-orange-600 whitespace-nowrap transition-colors"
        >
          Buy
        </a>
        <Link
          href="/stake"
          className="hover:underline hover:text-orange-600 whitespace-nowrap transition-colors"
        >
          Farm
        </Link>
        <Link
          href="/redemption"
          className="hover:underline hover:text-orange-600 whitespace-nowrap transition-colors"
        >
          Redemption
        </Link>
        <a
          href="https://shibarium.shib.io/bridge"
          target="_blank"
          className="hover:underline hover:text-orange-600 whitespace-nowrap transition-colors"
        >
          Bridge
        </a>
        <a
          className="bg-white/20 rounded-full px-2 w-full flex items-center justify-center gap-2 hover:text-orange-600 transition-colors"
          href="https://dexscreener.com/shibarium/0x4a89dbcf583f899371ca9dacd9a9840202caf160"
          target="_blank"
        >
          <Image src={logo} alt="logo" className="h-[30px] w-auto" />
          {web2Context &&
            web2Context.dopamoonPrice &&
            `$${web2Context.dopamoonPrice.toFixed(2)}`}
          <div>{Number(dopaBalance?.formatted).toFixed(2)}</div>
          <GiWallet size={15} />
        </a>
      </nav>
    );
  }

  return (
    <div className="relative z-40 mt-4 w-full px-4 md:px-4">
      <div className="overflow-hidden rounded-md outline-1 outline outline-slate-100/20 w-full flex flex-col md:flex-row justify-center">
        <div className="w-full shadow-lg">
          <motion.div
            initial={{
              opacity: 0.5,
              width: 0,
            }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 2, ease: [0.42, 0, 0.58, 1] }}
            className="relative overflow-hidden group w-full flex h-16 z-50 items-center justify-between backdrop-blur-md bg-slate-100/20 pr-4"
          >
            <Link href="/" className="relative flex gap-2 pl-2 items-center">
              <Image src={logo} className="w-auto h-[50px]" alt="logo" />

              <div className="flex flex-col text-center">
                <h1 className="text-3xl flex">
                  <span className="text-orange-600 font-bold">Dopa</span>
                  <span className="">Moon</span>
                </h1>

                <div className="relative flex items-start gap-10">
                  <div className="flex">
                    <div className="polygon logo-line delay-1 h-1.5 w-2 bg-white"></div>
                    <div className="polygon logo-line delay-2 h-1.5 w-2 bg-white"></div>
                    <div className="polygon logo-line delay-3 h-1.5 w-2 bg-white"></div>
                    <div className="polygon logo-line delay-4 h-1.5 w-2 bg-white"></div>
                  </div>
                  <div className="flex w-full gap-0.5">
                    <div className="triangle h-1.5 w-1.5 bg-orange-600"></div>
                    <div className="polygon-2 h-1.5 w-full bg-white"></div>
                  </div>
                  <div className="slide-right-to-left absolute right-0 top-1 h-0.5 w-2 bg-orange-600"></div>
                </div>
              </div>
            </Link>

            <div className="hidden md:flex">{nav()}</div>
          </motion.div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{ opacity: 1, height: "4rem" }}
          transition={{ delay: 1.5, duration: 1, ease: [0.42, 0, 0.58, 1] }}
          className="z-50 flex h-16 backdrop-blur-md shadow-lg"
        >
          <a
            href="https://discord.gg/e4uUDw4h"
            target="_blank"
            className="backdrop-blur-md group cursor-pointer relative w-24 flex justify-center items-center border-r-[1px] border-slate-100/20 h-full transition-colors duration-500"
          >
            <BsDiscord size={23} className="z-10 group-hover:animate-wiggle" />

            <div className="z-0 group-hover:w-full bg-orange-600 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </a>
          <a
            href="https://twitter.com/dopamoonxyz"
            target="_blank"
            className="backdrop-blur-md group cursor-pointer relative w-24 flex justify-center items-center border-r-[1px] border-slate-100/20 h-full transition-colors duration-500"
          >
            <BsTwitter size={23} className="z-10 group-hover:animate-wiggle" />
            <div className="z-0 group-hover:w-full bg-orange-600 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
          </a>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div className="whitespace-nowrap w-full md:w-auto backdrop-blur-md group cursor-pointer relative px-4 flex justify-center items-center h-full transition-colors duration-500">
                  <div
                    className="z-10 h-full w-full flex justify-center items-center"
                    {...(!ready && {
                      "aria-hidden": true,
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="w-full h-full"
                          >
                            CONNECT WALLET
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            className="w-full h-full bg-red-100/20"
                            onClick={openChainModal}
                            type="button"
                          >
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div
                          onClick={openAccountModal}
                          className="w-full h-full flex items-center justify-center gap-2"
                        >
                          <div>{account.displayName}</div>

                          {chain.hasIcon && chain.iconUrl && (
                            <Image
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              width={20}
                              height={20}
                            />
                          )}
                        </div>
                      );
                    })()}
                  </div>
                  <div className="z-0 group-hover:w-full bg-orange-600 absolute bottom-0 h-full w-0 left-0 transition-all ease-in-out duration-500" />
                </div>
              );
            }}
          </ConnectButton.Custom>
        </motion.div>
      </div>
    </div>
  );
}
