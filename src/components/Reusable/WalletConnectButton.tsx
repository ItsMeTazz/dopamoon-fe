import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaWallet } from "react-icons/fa";

export default function WalletConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            className="w-full h-12"
            {...(!ready && {
              "aria-hidden": true,
            })}
          >
            <div className="w-full h-full text-xs">
              {!connected && (
                <button
                  onClick={openConnectModal}
                  className="bg-green rounded-md gap-2 transition-transform relative flex justify-center items-center px-4 h-12 text-black"
                >
                  <FaWallet size={23} />
                  Connect Wallet
                </button>
              )}

              {chain && chain.unsupported && (
                <button
                  onClick={openChainModal}
                  className="bg-orange rounded-md gap-2 transition-transform relative flex justify-center items-center px-4 h-12 text-black"
                >
                  Unsupported network
                </button>
              )}

              {connected && !chain.unsupported && (
                <button
                  onClick={openAccountModal}
                  className="bg-green rounded-md gap-2 transition-transform relative flex justify-center items-center px-4 h-12 text-black"
                >
                  {account.displayName}
                </button>
              )}
            </div>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
