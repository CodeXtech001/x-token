"use client";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ValueProps } from "@/lib/typescript";
import { cn } from "@/lib/utils";
import React from "react";


export function HoverBorderGradientDemo({value}: ValueProps) {
  return (
    <div className={cn("m-40 mt-28 mb-8 flex justify-center text-center",{"m-40 mt-0 mb-0": value === "Buy Now"})}>
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

const AceternityLogo = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-black dark:text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};
