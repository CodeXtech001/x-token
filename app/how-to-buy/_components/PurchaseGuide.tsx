import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { step4s } from "@/lib/contents"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

function PurchaseGuide() {
  return (
    <Card className="text-card-foreground bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(0,255,211,0.15)]">
    <CardContent className="py-6 space-y-6">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="tracking-tight text-2xl font-semibold text-white">
        Step-by-Step X Coin Purchase Guide
        </div>
      </div>
      <div className="p-6 pt-6 space-y-6">
       {step4s.map((step, idx)=>
    <div key={idx} className="flex space-x-6 items-start">
    <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md text-white font-extrabold">{step.stepNumber}</div>
        {step.stepNumber !== 5 && <div className="absolute top-full left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-600 to-transparent"/>}
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
      </div>
      <div className="max-w-[300px] w-full mx-auto py-6 ">
    <Link href="/buytoken" className={`${buttonVariants()} w-full text-center text-white font-light bg-gradient-to-r z-20 from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move border border-blue-300/60 hover:border-blue-300 group/button`}><span className="text-white font-light">Buy X Tokens Now</span><ChevronRight className="w-6 h-6 group-hover/button:translate-x-4 transition-all duration-300 ease-in-out text-white font-light"/></Link>
    </div>
   </CardContent>
</Card>
  )
}

export default PurchaseGuide