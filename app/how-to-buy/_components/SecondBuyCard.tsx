import { Card, CardContent } from "@/components/ui/card"
import { step3s } from "@/lib/contents"

function SecondBuyCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {step3s.map((step, idx)=>
        <Card key={idx} className="text-card-foreground relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(0,255,211,0.06)] hover:shadow-[0_0_40px_rgba(0,255,211,0.25)] transition-transform duration-300 hover:scale-[1.02]">
        <CardContent className="py-6 space-y-6">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md">
                <step.icon className="w-6 h-6 text-white"/>  
                </div>
                <h3 className="text-xl font-bold text-white"> {step.title} </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{step.description}</p>
        </CardContent>
    </Card>   
    )}
   </div> 
  )
}

export default SecondBuyCard