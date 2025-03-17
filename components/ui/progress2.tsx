"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress2 = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, colorpicker, ...props }, ref) => {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-800",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className=
          "h-full w-full flex-1 bg-gradient-to-r transition-all duration-700 ease-in from-blue-500 via-purple-500 to-blue-500"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress2.displayName = ProgressPrimitive.Root.displayName;

export { Progress2 };
