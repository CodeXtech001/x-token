import { buttonVariants } from "@/components/ui/button"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { GetUserTransaction } from "@/lib/djangoQuery"
import { CryptoOrder } from "@/lib/typescript"
import { CircleCheck, CircleX, LoaderCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import CountDown from "@/components/CountDown"

async function page({
  params,
}: {
  params: {slug: string}
}) {
    
  let data: CryptoOrder | null = null;

  try {
    data = await GetUserTransaction(params.slug);
  } catch {
    notFound();
  }

  if (!data) {
    return notFound();
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-black text-white px-6 py-6">
            <div className="relative mb-8">
            {data.status === "pending" ?<LoaderCircle className="w-16 h-16 animate-spin text-blue-500" />:
             data.status === "canceled" ? <CircleX className="w-16 h-16  text-red-500" />:
             data.status === "approved" ?<CircleCheck className="w-16 h-16  text-green-500" />: null
             }
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 animate-pulse" />
            </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
             { data.status !== "approved" && <CountDown transactionId={data.order} turnOn/>}
            </div>
            <h3 className="text-2xl font-semibold mb-4">
            {data.status === "pending" ? "Waiting for Payment":
             data.status === "canceled" ? "Payment Declined" :
             data.status === "approved" ?"Payment Approved": null
             }
            </h3>
            <p className="text-gray-400 text-center max-w-md mb-8">
            Order 
            <span className="font-mono text-blue-400">{" "}#{data.order}{" "}</span>
            {data.status === "pending"
              ? " is being processed..."
              : data.status === "canceled"
              ? " is declined"
              : data.status === "approved"
              ? " is approved"
              : null}

            {data.status === "pending" && (
              <>
                <br />
                <span>
                  If payment has not been completed, please do so at your earliest convenience.
                </span>
                <br />
                If you have already made the payment, please wait while we process your transaction.
              </>
            )}
          </p>

            <div className={`min-h-[14rem] max-w-[450px] w-full list-none`}>
      <div className="relative h-full w-full rounded-2xl border p-1 md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="font-mono font-bold">{data.amount}{" "}{data.crypto_type}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-gray-400 mb-2">
                Address:
                </span>
                <div className="p-3 bg-black rounded-xl flex justify-between items-center">
                    <span className="font-mono font-bold text-blue-400 break-all">{data.wallet_address}</span>
                </div>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400">your Tokens:</span>
                <span className="font-mono font-bold text-yellow-400">{Number(data.tokens).toLocaleString()}𝕏</span>

            </div>
            <div className="flex justify-between">
            <span className="text-gray-400">Bonus Tokens:</span>
            <span className="font-mono font-bold text-purple-400">+{Number(data.bonus_tokens).toLocaleString()}𝕏</span>                
            </div>
            <div className="flex justify-between">
            <span className="text-gray-400">Total Tokens:</span>
            <span className="font-mono font-bold text-green-400">{Number(data.total_tokens).toLocaleString()}𝕏</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-400 m-6">
            If you're new to cryptocurrency, check out our{" "}
            <Link href="/how-to-buy" className="text-blue-400 underline hover:text-blue-300" >How to Buy</Link>
            {" "}guide to get started.
            </p>
          </div>
          <Link href="/dashboard" className={`${buttonVariants()} text-white font-light px-8 text-transparent bg-gradient-to-r from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move border border-blue-300/60 hover:border-blue-300 z-20 group/button`}><span className="text-white">Back to Dashboard</span></Link>
          </div>
          </div>
          </div>
        </div>
    </div>
  )
}

export default page