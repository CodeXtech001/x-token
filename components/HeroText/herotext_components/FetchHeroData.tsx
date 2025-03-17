import { ChevronRight } from "lucide-react";
import { ProgressDemo } from "../herotext_components/ProgressBar";
import { BackgroundGradientDemo } from './BackgroundGradientDemo'
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function FetchHeroData() {
  return (
    <>
        <BackgroundGradientDemo/>
        <Link href="/buytoken" className={`${buttonVariants()} text-white font-light px-8 mt-[10%] mb-8 bg-gradient-to-r from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move border border-blue-300/60 hover:border-blue-300 group/button`}><span className="text-white">Get Tokens</span><ChevronRight className="w-6 h-6 group-hover/button:translate-x-4 transition-all duration-300 ease-in-out text-white"/></Link>
        {/* <HoverBorderGradientDemo value ="Get Tokens"/> */}
        <div className=' space-y-2 px-6'>
        <div className='progress_text'>
           <p>Total Progress</p>
           <p>82%</p>
        </div>
           <ProgressDemo setprogress= {82} colorpicker= {"from-white to-blue-400"}/>
           <div className='progress_text'>
           <p>0 𝕏</p>
           <p>10M 𝕏</p>
        </div>
        </div>   
    </>
  )
}

export default FetchHeroData