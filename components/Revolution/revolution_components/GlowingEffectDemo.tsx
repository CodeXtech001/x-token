
import { HoverBorderGradientDemo } from "@/components/HeroText/herotext_components/HoverBorderGradientDemo";
import { buttonVariants } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function GlowingEffectDemo() {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 mt-12 md:mt-16">
        <GridItem/>
    </div>
  );
}


const GridItem = () => {
  return (
    <li className={`min-h-[14rem] list-none`}>
      <div className="relative h-full rounded-2xl border p-2  md:rounded-3xl md:p-3 group">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
          <h2 className='bg-clip-text text-transparent text-4xl md:text-[2.5rem] font-bold
                   bg-gradient-to-r from-white via-blue-400 to-white
                   bg-[length:200%_200%] animate-gradient-move'>Join the Revolution</h2>
                   <p className="text-xl text-gray-300/90 font-light">
                   Don't miss out on this opportunity to be part of the future of digital transactions.</p>
                   <div className="flex justify-center">
                   <Link href="/buytoken" className={`${buttonVariants()} text-white font-light px-8 mt-[10%] bg-gradient-to-r from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move border border-blue-300/60 hover:border-blue-300 group/button`}><span className="text-white">Buy Tokens Now</span><ChevronRight className="w-6 h-6 group-hover/button:translate-x-4 transition-all duration-300 ease-in-out text-white"/></Link>
                   </div>
                  {/* <HoverBorderGradientDemo value ="Buy Tokens Now"/>  */}
          </div>
        </div>
      </div>
    </li>
  );
};
