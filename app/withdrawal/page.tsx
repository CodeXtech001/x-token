import { commonNetworks } from "@/lib/contents"
import { TriangleAlert } from "lucide-react"
import Image from "next/image"

function page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 my-10">
        <div className="space-y-8 max-w-4xl mx-auto pb-12">
            <div>
                <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text mb-4">
                How to withdraw crypto on Binance
                </h1>
                <p className="text-gray-400">
                A step-by-step guide to safely withdraw your crypto from Binance
                </p>
            </div>
        </div>
        <div className="text-card-foreground shadow bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 space-y-4">
                <div className="relative max-h-[300px]">
                <iframe
                src="https://fast.wistia.net/embed/iframe/x460r4tnc7"
                allowFullScreen
                frameBorder="0"
                scrolling="no"
                className="w-full h-[300px] md:h-[360px]"
                allow="autoplay; fullscreen"
            ></iframe>
                </div>
                <p className="text-center text-sm text-gray-400">Tutorial Video</p>
            </div>
        </div>
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">
                1. Access Withdrawal
                </h3>
                <p className="text-gray-300">
                Log in to your Binance app and tap 
                <span className="font-semibold text-white"> Wallets</span>
                -
                <span className="font-semibold text-white">Spot</span>
                -
                <span className="font-semibold text-white">Withdraw</span>
                .
                </p>
                <div className="relative h-[300px] w-full sm:w-[313px]">
                    <Image src="/assets/images/image-1.webp" alt="Binance withdrawal step 1" loading="lazy" className="object-contain h-full" width={739} height={1600}/>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">
                2. Select Cryptocurrency
                </h3>
                <p className="text-gray-300">
                Choose the cryptocurrency you want to withdraw, for example, BNB. Then, tap 
                <span className="font-semibold text-white">Send via Crypto Network</span>.
            
                </p>
                <div className="relative h-[300px] w-full">
                    <Image src="/assets/images/image-2.webp" alt="Binance withdrawal step 2" loading="lazy" className="object-contain h-full" width={739} height={1600}/>
                </div>
            </div>
            <div className="rounded-xl border text-card-foreground shadow bg-red-500/10 border-red-500/20">
            <div className="p-6">
              <div className="flex items-start gap-4">
              <TriangleAlert className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h4 className="font-semibold text-red-400">
                Important Warning
                </h4>
                <p className="text-gray-300">
                Choose the network carefully and make sure that the selected network is the same as the network of the platform you are withdrawing funds to. If you select the wrong network, your funds might be lost and couldn't be recovered.
                </p>
              </div>
            </div>
         </div>
         </div>
         <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">
            Common Networks
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonNetworks.map((network,idx)=>
              <div key={idx} className="rounded-xl text-card-foreground shadow bg-black/40 backdrop-blur-xl border border-white/5">
              <div className="p-4">
                  <h5 className="font-bold text-white">{network.name}</h5>
                  <p className="text-sm text-gray-400">{network.description}</p>
              </div>
              </div>
            )}
            </div>
         </div>
         <div className="rounded-xl text-card-foreground shadow bg-black/40 backdrop-blur-xl border border-white/5">
         <div className="p-6 space-y-4">
            <h4 className="font-bold text-white">Important Notes</h4>
            <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"/>
                    <span>DO NOT select the cheapest fee option. Select the one that is compatible with the external platform.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"/>
                    <span>Confirm that the receiving platform supports the contract address of the token you're withdrawing.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"/>
                    <span>For certain networks (BEP2, EOS), you must fill in the Memo when making a transfer.</span>
                </li>
            </ul>
        </div>
        </div>
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
            Completing the Withdrawal
            </h3>
            <div className="space-y-6">
                <p className="text-gray-300">1. Enter the withdrawal amount to see the transaction fee and final amount.</p>
                <div className="relative h-[300px] w-full">
                <Image src="/assets/images/image-3.webp" alt="Binance withdrawal step 3" loading="lazy" className="object-contain h-full" width={739} height={1600}/>
                </div>
                <p className="text-gray-300">2. Review and confirm the transaction details carefully.</p>
                <div className="relative h-[300px] w-full sm:w-[377px]">
                <Image src="/assets/images/image-4.webp" alt="Binance withdrawal step 4" loading="lazy" className="object-contain h-full" width={739} height={1600}/>
                </div>
                <p className="text-gray-300">3. Verify the transaction with your passkey or 2FA devices and wait for processing.</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default page