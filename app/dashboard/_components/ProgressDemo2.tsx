"use client"

import * as React from "react"

import { Progress2 } from "@/components/ui/progress2"
import { ProgressUpdateProps } from "@/lib/typescript"

export function ProgressDemo2({setprogress}: ProgressUpdateProps) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(setprogress), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress2 value={progress} className="w-full " />   
}