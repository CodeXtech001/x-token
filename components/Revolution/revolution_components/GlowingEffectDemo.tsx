
"use clients";

import { HoverBorderGradientDemo } from "@/components/HeroText/herotext_components/HoverBorderGradientDemo";
import { GlowingEffect } from "@/components/ui/glowing-effect";

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
                    <HoverBorderGradientDemo value ="Buy Tokens Now"/> 
          </div>
        </div>
      </div>
    </li>
  );
};
