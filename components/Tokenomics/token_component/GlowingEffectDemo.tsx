"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ProgressDemo } from "@/components/HeroText/herotext_components/ProgressBar";
import { TokenDetails, TokenDistribution } from "@/lib/typescript";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export function GlowingEffectDemo({tokenDistribution, tokenDetails }: { tokenDistribution: TokenDistribution[], tokenDetails: TokenDetails[] }) {

  const controls = useAnimation(); // Controls the animation
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 }); // Detects visibility

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <ul className="max-w-7xl w-full mx-auto grid grid-cols-1  md:grid-cols-2 gap-8 px-4 mt-12 md:mt-16">
    <div className="relative overflow-hidden w-full">      
      <motion.section
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={{
      hidden: { opacity: 0, translateX: -50 },
      visible: { opacity: 1,translateX: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }}>
      <GridItem1
       tokenDistribution= {tokenDistribution}
      />
      </motion.section>
      </div>
      <div className="relative overflow-hidden w-full">
      <motion.section
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={{
      hidden: { opacity: 0, translateX: 50 },
      visible: { opacity: 1, translateX: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }}>
      <GridItem2
       tokenDetails= {tokenDetails}
      />
      </motion.section>
      </div>
    </ul>
  );
}

const GridItem1 = () => {
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
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"> Token Distribution</h2>
            <div className="space-y-3">     
      
              <div className=" space-y-2">
              <div className='progress_text2'>
              <p>Public Sale</p>
              <p>40%</p>
              </div>
              <ProgressDemo setprogress= {40} colorpicker= "from-blue-500 to-blue-600"/>
              </div>
              <div className=" space-y-2">
              <div className='progress_text2'>
              <p>Development</p>
              <p>25%</p>
              </div>
              <ProgressDemo setprogress= {25} colorpicker= "from-purple-500 to-purple-600"/>
              </div>
              <div className=" space-y-2">
              <div className='progress_text2'>
              <p>Team & Advisors</p>
              <p>15%</p>
              </div>
              <ProgressDemo setprogress= {15} colorpicker= "from-indigo-500 to-indigo-600"/>
              </div>
              <div className=" space-y-2">
              <div className='progress_text2'>
              <p>Marketing</p>
              <p>10%</p>
              </div>
              <ProgressDemo setprogress= {10} colorpicker= "from-pink-500 to-pink-600"/>
              </div>
              <div className=" space-y-2">
              <div className='progress_text2'>
              <p>Reserve</p>
              <p>10%</p>
              </div>
              <ProgressDemo setprogress= {10} colorpicker= "from-cyan-500 to-cyan-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const GridItem2 = ({tokenDetails} :{ tokenDetails: TokenDetails[]} ) => {
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
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Token Details</h2>
            <div className="space-y-3">     
            {tokenDetails.map((token,index)=>
              <div key={index} className="flex justify-between items-center border-b border-gray-700/50 pb-4 hover:border-blue-500/30 transition-colors duration-300">
              <p className="text-gray-400 group-hover/item:text-gray-300 transition-colors duration-300 text-sm">{token.name}</p>
              <p className="font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-sm">{token.value}</p>
              </div>
            )}
              </div>
            </div>
          </div>
        </div>
    </li>
  );
};

