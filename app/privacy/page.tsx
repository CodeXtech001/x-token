import { privacyPolicy } from "@/lib/contents"
import { GlowingEffectDemo } from "./_components/GlowingEffectDemo"
import { ContactCard } from "./_components/ContactCard"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

function page() {
  return (
    <div className="p-4 max-w-5xl mx-auto mt-10">
    <div className="space-y-4">
        <Link href="/sign-up" className="flex items-center text-blue-300 hover:text-blue-200 transition-all duration-300 ease-in-out space-x-2 group absolute top-24"><ArrowLeft className="group-hover:-translate-x-2 transition-all duration-300 ease-in-out"/><span>Back</span></Link>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">{privacyPolicy.title}</h1>
        <p className="text-gray-300 text-sm">{privacyPolicy.introduction}</p>
    </div>
   <GlowingEffectDemo section={privacyPolicy.sections}/>
   <ContactCard/>
    </div>
  )
}

export default page