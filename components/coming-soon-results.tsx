"use client"

import Image from "next/image"
import { TrophyIcon } from "lucide-react"

type ComingSoonResultsProps = {
  gameTitle: string
  gameLogo: string
  jackpotAmount: string
  variant: "standard" | "plus"
}

export function ComingSoonResults({ gameTitle, gameLogo, jackpotAmount, variant }: ComingSoonResultsProps) {
  // Determine styles based on variant
  const bgColor = variant === "standard" ? "bg-blue-50" : "bg-sky-50"
  const borderColor = variant === "standard" ? "border-blue-100" : "border-sky-100"
  const textColor = variant === "standard" ? "text-blue-600" : "text-sky-600"

  return (
    <div className={`${bgColor} rounded-md p-3 mb-3 border ${borderColor}`}>
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
        <div className="h-8 w-28 relative">
          <Image src={gameLogo} alt={gameTitle} fill className="object-contain object-left" />
        </div>
        <div className="flex items-center gap-1">
          <TrophyIcon className="h-3.5 w-3.5 text-amber-500" />
          <div className={`text-xs font-bold ${textColor}`}>{jackpotAmount}</div>
        </div>
      </div>

      {/* Placeholder Lottery Balls */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {Array(6)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className={`w-7 h-6 text-xs rounded-md flex items-center justify-center font-semibold ${
                variant === "standard" ? "bg-blue-100 text-blue-400" : "bg-sky-100 text-sky-400"
              }`}
            >
              X
            </div>
          ))}
        <div className="flex items-center gap-1 ml-1">
          <span className={`text-xs ${textColor}`}>+</span>
          <div className="w-7 h-6 text-xs rounded-md flex items-center justify-center font-semibold bg-amber-100 text-amber-400">
            X
          </div>
        </div>
      </div>
    </div>
  )
}
