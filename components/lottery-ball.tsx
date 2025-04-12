import { cn } from "@/lib/utils"

type LotteryBallProps = {
  number: number | { $numberInt: string }
  variant: "standard" | "plus" | "bonus"
  size?: "sm" | "md" | "lg"
}

export function LotteryBall({ number, variant, size = "md" }: LotteryBallProps) {
  // Extract the number value from the object if needed
  const displayNumber =
    typeof number === "object" && number !== null && "$numberInt" in number
      ? Number.parseInt(number.$numberInt)
      : number

  const sizeClasses = {
    sm: "w-7 h-6 text-xs",
    md: "w-9 h-8 text-sm",
    lg: "w-11 h-10 text-base",
  }

  const variantClasses = {
    standard: "bg-blue-100 text-blue-700",
    plus: "bg-sky-100 text-sky-700",
    bonus: "bg-amber-100 text-amber-700",
  }

  return (
    <div
      className={cn(
        "rounded-md flex items-center justify-center font-semibold",
        sizeClasses[size],
        variantClasses[variant],
      )}
    >
      {displayNumber}
    </div>
  )
}
