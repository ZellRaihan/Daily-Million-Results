import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy } from "lucide-react"

type Prize = {
  match: string
  prizeType: string
  numberOfWinners: { $numberInt: string }
  prize: string
}

type PrizeTableProps = {
  prizes: Prize[]
  variant: "standard" | "plus"
}

export function PrizeTable({ prizes, variant }: PrizeTableProps) {
  const headerColor = variant === "standard" ? "text-emerald-600" : "text-purple-600"
  const bgColor = variant === "standard" ? "bg-emerald-50" : "bg-purple-50"

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className={`flex items-center gap-2 p-3 ${bgColor} border-b`}>
        <Trophy className={`h-4 w-4 ${headerColor}`} />
        <h3 className={`text-sm font-semibold ${headerColor}`}>
          {variant === "standard" ? "Daily Million" : "Daily Million Plus"} Prize Breakdown
        </h3>
      </div>

      <div className="p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Match</TableHead>
              <TableHead className="text-xs">Prize</TableHead>
              <TableHead className="text-right text-xs">Winners</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prizes.map((prize, index) => (
              <TableRow key={index}>
                <TableCell className="py-1.5 text-xs">{prize.match}</TableCell>
                <TableCell className="py-1.5 text-xs">{prize.prize}</TableCell>
                <TableCell className="py-1.5 text-right text-xs">
                  {Number.parseInt(prize.numberOfWinners.$numberInt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
