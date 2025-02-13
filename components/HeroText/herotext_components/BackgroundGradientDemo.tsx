"use client"
import { BackgroundGradient } from "@/components/ui/background-gradient";


export function BackgroundGradientDemo() {

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-8 md:px-0 mt-16">
      <BackgroundGradient className="rounded-xl p-4 bg-black w-full ">
       <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-white ">$5.44</p> 
       <p className="font-light text-xs text-[rgb(209,213,219,.9)]">Current Price</p>
      </BackgroundGradient>
      <BackgroundGradient className="rounded-xl p-4 bg-black w-full">
       <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-white ">8.2M+</p> 
       <p className="font-light text-xs text-[rgb(209,213,219,.9)]">Tokens Sold</p>
      </BackgroundGradient>
      <BackgroundGradient className="rounded-xl p-4 bg-black w-full">
       <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-white ">3/5</p> 
       <p className="font-light text-xs text-[rgb(209,213,219,.9)]">Stage</p>
      </BackgroundGradient>
      <BackgroundGradient className="rounded-xl p-4 bg-black w-full">
       <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-white ">$9.55</p> 
       <p className="font-light text-xs text-[rgb(209,213,219,.9)]">Next Price</p>
      </BackgroundGradient>
  
    </div>
  );
}
