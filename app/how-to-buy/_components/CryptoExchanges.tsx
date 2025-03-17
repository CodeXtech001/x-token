import { Card, CardContent } from '@/components/ui/card'
import { step2s } from '@/lib/contents'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CryptoExchanges() {
  return (
    <Card className="text-card-foreground bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(0,255,211,0.15)]">
    <CardContent className="py-6 space-y-6">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="tracking-tight text-2xl font-semibold text-white">
        Buy Crypto via Crypto Exchanges
        </div>
      </div>
      <div className="p-6 pt-6 space-y-6">
       {step2s.map((step, idx)=>
    <div key={idx} className="flex space-x-6 items-start">
    <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md text-white font-extrabold">{step.stepNumber}</div>
        <div className="absolute top-full left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-600 to-transparent"/>
    </div>
    <div className="flex-1">
        <div className="text-card-foreground shadow relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl hover:shadow-[0_0_40px_rgba(0,225,201,0.09)] transition-transform duration-300 hover:scale-[1.02]">
        <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md">
                <step.icon className=" w-6 h-6 text-white"/>
                </div>
                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{step.description}</p>
        </div>
        </div>
    </div>
</div>)}
<Link href= "/withdrawal" className="inline-flex items-center text-blue-500 hover:text-blue-400 text-sm transition-all duration-200  z-10 group"><span>Learn how to withdraw from Binance</span><ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Link>
      </div>
   </CardContent>
</Card>
  )
}

export default CryptoExchanges