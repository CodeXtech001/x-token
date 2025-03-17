import { Card, CardContent} from "@/components/ui/card"
import { BadgeCheck } from "lucide-react"
import Image from "next/image"

function index() {
  return (
    <Card className="mt-12">
        <CardContent className="py-6">
        <div className="flex items-center gap-6">
            <Image src="/assets/images/8HSTqIlD_400x400.jpg" alt="elon" width={400} height={400} className=" rounded-full w-16 h-16 object-cover "/>
            <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2"><span>Elon Musk</span><BadgeCheck className="w-5 h-5 text-blue-400" /></h3>
                <p className="text-sm text-gray-400">@elonmusk</p>
            </div>
        </div>
        <p className="text-gray-300 mt-4 leading-relaxed whitespace-pre-wrap">
        We extend a warm welcome as you embark on a unique opportunity to be part of the future of blockchain technology and decentralized possibilities through X Coin.
        As we commence our presale stages, currently at Stage 3 with a price of $5.44, you have the exclusive chance to invest in X Coin before its value escalates in subsequent stages, culminating in the public sale at $27.50.<br/><br/>
        Owning X Coin is more than a financial investment; it's an active endorsement of a visionary project propelling the progress of blockchain technology, laying the groundwork for a decentralized future.<br/>
        At X Coin, we prioritize top-tier security and unwavering transparency for every transaction, all conducted directly on our platform.
        Our dedicated live chat support team is available around the clock to address any inquiries or concerns you may have.<br/><br/>
        Seize this unique opportunity to shape the future of blockchain technology.
        Invest in X Coin today and embark on an exciting journey with us!
        </p>
        </CardContent>
    </Card>
  )
}

export default index