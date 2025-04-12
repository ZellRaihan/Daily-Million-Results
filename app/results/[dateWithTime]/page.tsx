import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getResultsByDate } from "@/lib/actions"
import { LotteryBall } from "@/components/lottery-ball"
import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getIrishTime } from "@/lib/utils"
import type { Metadata } from "next"

interface Prize {
  match: string;
  prizeType: string;
  numberOfWinners: {
    $numberInt: string;
  } | string;
  prize: string;
}

// Generate dynamic metadata for each results page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ dateWithTime: string }>
}): Promise<Metadata> {
  // Await the params
  const { dateWithTime } = await params

  // Parse date and time from URL
  const dateTimeRegex = /^(\d{4}-\d{2}-\d{2})-(\d{1,2})(am|pm)$/
  const match = dateWithTime.match(dateTimeRegex)

  if (!match) {
    return {
      title: "Daily Millions Results | Not Found",
      description: "The requested lottery results could not be found."
    }
  }

  const [_, dateStr, hourStr, ampm] = match
  let hour = Number.parseInt(hourStr)

  // Convert 12-hour format to 24-hour format for Irish time
  if (ampm === "pm" && hour < 12) {
    hour += 12
  } else if (ampm === "am" && hour === 12) {
    hour = 0
  }

  // Find the results for the given date
  const dateResults = await getResultsByDate(dateStr) as any[]

  // If no results found, return default metadata
  if (!dateResults || dateResults.length === 0) {
    return {
      title: "Daily Millions Results | Not Found",
      description: "The requested lottery results could not be found."
    }
  }

  // Find the specific draw based on the hour in Irish time
  const matchingResult = dateResults.find((item: any) => {
    const drawDate = new Date(item.standard.drawDates[0])
    // Convert to Dublin timezone for comparison
    const dublinDate = new Date(drawDate.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
    return dublinDate.getHours() === hour
  })

  // If no matching result found, use the first result
  const result = matchingResult || dateResults[0]
  const drawDate = new Date(result.standard.drawDates[0])

  // Format day, date and month in Irish timezone
  const day = drawDate.toLocaleDateString("en-IE", { weekday: "long", timeZone: "Europe/Dublin" })
  const dayNum = drawDate.toLocaleDateString("en-IE", { day: "numeric", timeZone: "Europe/Dublin" })
  const month = drawDate.toLocaleDateString("en-IE", { month: "long", timeZone: "Europe/Dublin" })
  const year = drawDate.toLocaleDateString("en-IE", { year: "numeric", timeZone: "Europe/Dublin" })

  // Get Dublin date for hour calculation
  const dublinDate = new Date(drawDate.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
  const drawHour = dublinDate.getHours()
  const drawAmpm = drawHour >= 12 ? "pm" : "am"
  const hour12 = drawHour % 12 || 12 // Convert 0 to 12 for 12am
  const timeStr = `${hour12}${drawAmpm}`
  const drawType = drawHour < 18 ? "Afternoon" : "Evening"

  // Complete title
  const pageTitle = `Daily Millions Results for ${day} ${dayNum} ${month} ${year} (${timeStr})`
  const formattedDate = `${dayNum} ${month} ${year}`
  
  return {
    title: pageTitle,
    description: `Check the winning numbers for the Daily Millions ${drawType.toLowerCase()} draw on ${formattedDate}. View the winning combination and complete prize breakdown for both Daily Million and Daily Million Plus games.`,
    keywords: `Daily Millions, Irish Lottery, ${formattedDate}, lottery results, winning numbers, Daily Million Plus, ${drawType} Draw, lottery prizes`,
    openGraph: {
      title: pageTitle,
      description: `Daily Millions ${drawType} Draw results for ${formattedDate}. View winning numbers and prize breakdown.`,
      type: "article",
      publishedTime: drawDate.toISOString(),
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/${dateWithTime}`,
      images: [
        {
          url: "/DailyMillions-OG.webp",
          width: 1200,
          height: 630,
          alt: "Daily Millions Results"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: `Daily Millions ${drawType} Draw results for ${formattedDate}. Check winning numbers and prize breakdown.`,
      images: ["/DailyMillions-OG.webp"]
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/${dateWithTime}`
    }
  }
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ dateWithTime: string }>
}) {
  // Await the params
  const { dateWithTime } = await params

  // Parse date and time from URL
  const dateTimeRegex = /^(\d{4}-\d{2}-\d{2})-(\d{1,2})(am|pm)$/
  const match = dateWithTime.match(dateTimeRegex)

  if (!match) {
    notFound()
  }

  const [_, dateStr, hourStr, ampm] = match
  let hour = Number.parseInt(hourStr)

  // Convert 12-hour format to 24-hour format for Irish time
  if (ampm === "pm" && hour < 12) {
    hour += 12
  } else if (ampm === "am" && hour === 12) {
    hour = 0
  }

  // Find the results for the given date - server-side
  const dateResults = await getResultsByDate(dateStr) as any[]

  // If no results found, return 404
  if (!dateResults || dateResults.length === 0) {
    notFound()
  }

  // Find the specific draw based on the hour in Irish time
  const matchingResult = dateResults.find((item: any) => {
    const drawDate = new Date(item.standard.drawDates[0])
    // Convert to Dublin timezone for comparison
    const dublinDate = new Date(drawDate.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
    return dublinDate.getHours() === hour
  })

  // If no matching result found, use the first result
  const result = matchingResult || dateResults[0]

  const standardGame = result.standard
  const plusGame = result.addonGames[0]
  const drawDate = new Date(standardGame.drawDates[0])

  // Format day, date and month in Irish timezone
  const day = drawDate.toLocaleDateString("en-IE", { weekday: "long", timeZone: "Europe/Dublin" })
  const dayNum = drawDate.toLocaleDateString("en-IE", { day: "numeric", timeZone: "Europe/Dublin" })
  const month = drawDate.toLocaleDateString("en-IE", { month: "long", timeZone: "Europe/Dublin" })
  const year = drawDate.toLocaleDateString("en-IE", { year: "numeric", timeZone: "Europe/Dublin" })

  // Get Dublin date for hour calculation
  const dublinDate = new Date(drawDate.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
  const drawHour = dublinDate.getHours()
  const drawAmpm = drawHour >= 12 ? "pm" : "am"
  const hour12 = drawHour % 12 || 12 // Convert 0 to 12 for 12am
  const timeStr = `${hour12}${drawAmpm}`

  // Complete title
  const pageTitle = `Daily Millions Results for ${day} ${dayNum} ${month} ${year} (${timeStr})`

  const drawTime = getIrishTime(drawDate)
  const drawType = drawHour < 18 ? "Afternoon" : "Evening"
  const badgeClass =
    drawType === "Evening"
      ? "bg-gradient-to-r from-amber-500 to-orange-500"
      : "bg-gradient-to-r from-blue-500 to-sky-500"

  // Find the other draw for this date (if any)
  const otherDraw = dateResults.find((item: any) => {
    const itemDate = new Date(item.standard.drawDates[0])
    return itemDate.getTime() !== drawDate.getTime()
  })

  let otherDrawType = null
  let otherDrawTimeStr = null

  if (otherDraw) {
    const otherDrawDate = new Date(otherDraw.standard.drawDates[0])
    // Convert to Dublin timezone for other draw
    const otherDublinDate = new Date(otherDrawDate.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
    const otherHour = otherDublinDate.getHours()
    const otherAmpm = otherHour >= 12 ? "pm" : "am"
    const otherHour12 = otherHour % 12 || 12

    otherDrawType = otherHour < 18 ? "Afternoon" : "Evening"
    otherDrawTimeStr = `${otherHour12}${otherAmpm}`
  }

  // Format date for breadcrumbs
  const formattedDate = `${dayNum} ${month} ${year}`
  const formattedDateWithTime = `${formattedDate} (${timeStr})`

  return (
    <div className="py-3">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SportsEvent",
              "name": pageTitle,
              "description": `Daily Millions ${drawType} Draw results for ${formattedDate}. Winning numbers: ${standardGame.grids[0].standard[0].join(", ")} plus bonus ${standardGame.grids[0].additional[0][0]}.`,
              "startDate": drawDate.toISOString(),
              "endDate": drawDate.toISOString(),
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
              "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/DailyMillions-OG.webp`,
              "location": {
                "@type": "Place",
                "name": "Daily Millions Lottery Draw",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Dublin",
                  "addressRegion": "Dublin",
                  "addressCountry": "Ireland"
                }
              },
              "organizer": {
                "@type": "Organization",
                "name": "Daily Millions Lottery",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}`
              },
              "performer": {
                "@type": "Organization",
                "name": "Daily Millions Lottery"
              },
              "offers": {
                "@type": "Offer",
                "price": "1",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock",
                "validFrom": drawDate.toISOString(),
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/${dateStr}-${timeStr}`
              },
              "result": {
                "@type": "ItemList",
                "numberOfItems": standardGame.grids[0].standard[0].length + 1,
                "itemListElement": [
                  ...standardGame.grids[0].standard[0].map((number: number, index: number) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                      "@type": "Thing",
                      "name": `Number ${number}`,
                      "description": `Regular ball: ${number}`
                    }
                  })),
                  {
                    "@type": "ListItem",
                    "position": standardGame.grids[0].standard[0].length + 1,
                    "item": {
                      "@type": "Thing",
                      "name": `Bonus: ${standardGame.grids[0].additional[0][0]}`,
                      "description": `Bonus ball: ${standardGame.grids[0].additional[0][0]}`
                    }
                  }
                ]
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Results",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/history`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": formattedDateWithTime,
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/${dateStr}-${timeStr}`
                }
              ]
            }
          ])
        }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Results", href: "/" },
          { label: formattedDateWithTime, isCurrentPage: true },
        ]}
      />

      <div className="mb-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-1 mb-2 h-7 text-xs bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700">
            <ArrowLeft className="h-3 w-3" />
            Back to Home
          </Button>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-6 pb-3 border-b">
          <h1 className="text-xl md:text-2xl font-bold mb-3">{pageTitle}</h1>

          {/* SEO Content Section - Added below main title */}
          <div className="max-w-3xl mx-auto mb-4 text-sm text-gray-600">
            <p>
              Here are the official Daily Millions results for {day} {dayNum} {month} {year} ({timeStr}) draw. The
              winning numbers for this {drawType.toLowerCase()} draw were drawn at {drawTime}. Check if you've matched
              the winning combination and see the prize breakdown for both Daily Million and Daily Million Plus games.
            </p>
          </div>

          <div className="flex justify-center items-center gap-2 mb-3">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 ${badgeClass} rounded-full text-xs text-white font-medium shadow-sm`}
            >
              <Clock className="h-3 w-3 text-white/80" />
              <span>
                {drawType} Draw • {drawTime}
              </span>
            </div>
          </div>

          {/* Date Picker and Draw Switcher */}
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <div className="w-full sm:w-auto sm:min-w-[180px] relative z-30">
              <DatePicker initialDate={drawDate} className="bg-white text-gray-700 shadow-sm" showIcon={true} />
            </div>
            {otherDraw && otherDrawTimeStr && (
              <Link href={`/results/${dateStr}-${otherDrawTimeStr}`}>
                <Button variant="outline" size="sm" className="h-9 text-xs bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 border-blue-200 shadow-sm">
                  Switch to {otherDrawType} Draw
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg p-4 shadow-sm border mb-6">
          {/* Daily Million */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3 pb-2 border-b">
              <div className="h-8 w-32 relative">
                <Image
                  src="/DailyMillion.svg"
                  alt={standardGame.gameTitle}
                  fill
                  className="object-contain object-left"
                />
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 uppercase">JACKPOT</div>
                <div className="text-lg font-bold text-blue-600">{standardGame.jackpotAmount}</div>
              </div>
            </div>

            <div className="flex justify-center gap-2 my-4">
              {standardGame.grids[0].standard[0].map((number: number, idx: number) => (
                <LotteryBall key={idx} number={number} variant="standard" size="md" />
              ))}
              <div className="flex items-center gap-0.5 ml-1">
                <span className="text-xs text-blue-600">+</span>
                <LotteryBall number={standardGame.grids[0].additional[0][0]} variant="bonus" size="md" />
              </div>
            </div>

            <div className="text-xs text-slate-500 italic mt-3 text-center">{standardGame.prizeMessage}</div>
          </div>

          {/* Daily Million Plus */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-3 pb-2 border-b">
              <div className="h-8 w-32 relative">
                <Image
                  src="/DailyMillionPlus.svg"
                  alt={plusGame.gameTitle}
                  fill
                  className="object-contain object-left"
                />
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 uppercase">JACKPOT</div>
                <div className="text-lg font-bold text-sky-600">{plusGame.jackpotAmount}</div>
              </div>
            </div>

            <div className="flex justify-center gap-2 my-4">
              {plusGame.grids[0].standard[0].map((number: number, idx: number) => (
                <LotteryBall key={idx} number={number} variant="plus" size="md" />
              ))}
              <div className="flex items-center gap-0.5 ml-1">
                <span className="text-xs text-sky-600">+</span>
                <LotteryBall number={plusGame.grids[0].additional[0][0]} variant="bonus" size="md" />
              </div>
            </div>

            <div className="text-xs text-slate-500 italic mt-3 text-center">{plusGame.prizeMessage}</div>
          </div>
        </div>

        {/* Prize Breakdown Section */}
        <div className="text-center mb-6 pb-3 border-b">
          <h2 className="text-lg font-bold">Prize Breakdown</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Daily Million Prize Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="bg-blue-50 p-3 border-b">
              <h3 className="text-sm font-semibold text-blue-700">Daily Million Prizes</h3>
            </div>
            <div className="p-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-xs font-medium text-gray-600">Numbers Matched</th>
                    <th className="text-left py-2 text-xs font-medium text-gray-600">Prize Amount</th>
                    <th className="text-right py-2 text-xs font-medium text-gray-600">Total Winners</th>
                  </tr>
                </thead>
                <tbody>
                  {standardGame.prizes.map((prize: Prize, index: number) => {
                    // Parse the number of winners from MongoDB $numberInt format
                    const winnerCount = typeof prize.numberOfWinners === 'object' && '$numberInt' in prize.numberOfWinners
                      ? parseInt(prize.numberOfWinners.$numberInt)
                      : parseInt(prize.numberOfWinners);

                    return (
                      <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                        <td className="py-2.5 text-xs font-medium">{prize.match}</td>
                        <td className="py-2.5 text-xs font-medium text-blue-600">{prize.prize}</td>
                        <td className="py-2.5 text-xs text-right">
                          {winnerCount > 0 ? (
                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">
                              {winnerCount.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-gray-400 font-medium">No Winners</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Daily Million Plus Prize Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="bg-sky-50 p-3 border-b">
              <h3 className="text-sm font-semibold text-sky-700">Daily Million Plus Prizes</h3>
            </div>
            <div className="p-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-xs font-medium text-gray-600">Numbers Matched</th>
                    <th className="text-left py-2 text-xs font-medium text-gray-600">Prize Amount</th>
                    <th className="text-right py-2 text-xs font-medium text-gray-600">Total Winners</th>
                  </tr>
                </thead>
                <tbody>
                  {plusGame.prizes.map((prize: Prize, index: number) => {
                    // Parse the number of winners from MongoDB $numberInt format
                    const winnerCount = typeof prize.numberOfWinners === 'object' && '$numberInt' in prize.numberOfWinners
                      ? parseInt(prize.numberOfWinners.$numberInt)
                      : parseInt(prize.numberOfWinners);

                    return (
                      <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                        <td className="py-2.5 text-xs font-medium">{prize.match}</td>
                        <td className="py-2.5 text-xs font-medium text-sky-600">{prize.prize}</td>
                        <td className="py-2.5 text-xs text-right">
                          {winnerCount > 0 ? (
                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">
                              {winnerCount.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-gray-400 font-medium">No Winners</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mb-4">
          <Link href="/">
            <Button
              variant="default"
              size="sm"
              className="gap-1 h-9 px-5 bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-1" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
