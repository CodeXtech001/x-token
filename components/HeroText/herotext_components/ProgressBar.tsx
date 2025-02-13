"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import { ProgressUpdateProps } from "@/lib/typescript"

export function ProgressDemo({setprogress, colorpicker }: ProgressUpdateProps) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(setprogress), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} colorpicker ={colorpicker} className="w-full" />
}
