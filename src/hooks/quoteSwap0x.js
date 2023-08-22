import { NULL_ADDRESS } from "../statics/addresses";

// TODO: add slippage control to the function signature
export default async function quoteSwap0x(
  amountIn,
  tokenIn,
  tokenOut,
  slippage
) {
  const requestOptions = {
    method: "GET",
    headers: { "0x-api-key": process.env.NEXT_PUBLIC_0X_KEY },
  };

  const slippageNumber = Number(slippage) / 100;
  const addressIn = tokenIn.address != NULL_ADDRESS ? tokenIn.address : "ETH";
  const addressOut =
    tokenOut.address != NULL_ADDRESS ? tokenOut.address : "ETH";
  const quoteReq = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/swap/v1/quote?buyToken=${addressOut}&sellToken=${addressIn}&sellAmount=${amountIn}&feeRecipient=${process.env.NEXT_PUBLIC_FEE_RECIPIENT}&buyTokenPercentageFee=${process.env.NEXT_PUBLIC_FEE_AMOUNT}&slippagePercentage=${slippageNumber}`,
    requestOptions
  );
  const quoteData = await quoteReq.json();

  return quoteData;
}
