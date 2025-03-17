import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ValueProps } from "@/lib/typescript";
import { cn } from "@/lib/utils";
import React from "react";


export function HoverBorderGradientDemo({value}: ValueProps) {
  return (
    <div className={cn("m-30 mt-[10%] mb-8 flex justify-center text-center",{"m-30 my-0": value === "Buy Now","m-10 my-6":value ==="Buy Tokens Now"})}>
      <HoverBorderGradient
        containerClassName="rounded-xl group"
        as="button"
        className=" bg-clip-text text-transparent bg-gradient-to-r font-semibold from-white via-blue-400 to-white 
                   bg-[length:200%_200%] animate-gradient-move flex items-center justify-center space-x-2 "
      >
        <span>{value}</span>
      </HoverBorderGradient>
    </div>
  );
}

