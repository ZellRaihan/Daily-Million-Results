import Link from "next/link"
import Image from "next/image"
import { formatDate, formatDateWithTimeForUrl, getIrishTime } from "@/lib/utils"
import { getLatestResults, groupResultsByDate } from "@/lib/actions"
import { LotteryBall } from "@/components/lottery-ball"
import { DatePicker } from "@/components/date-picker"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ClientPagination } from "@/components/client-pagination"
import type { Metadata } from "next"

// Define types for our lottery data
interface Grid {
  standard: number[][]
  additional: number[][]
}

interface Game {
  drawDates: string[]
  gameLogo: string
  gameTitle: string
  jackpotAmount: string
  grids: Grid[]
}

interface LotteryResult {
  standard: Game
  addonGames: Game[]
}

interface GroupedResults {
  [key: string]: LotteryResult[]
}

const ITEMS_PER_PAGE = 5 // Number of dates to show per page

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string }
}): Promise<Metadata> {
  // Await the searchParams if it's a promise
  const resolvedParams = await Promise.resolve(searchParams);
  // Get current page from query params or default to 1
  const currentPage = Number(resolvedParams.page) || 1
  
  // Get latest results for potential use in meta description
  const results = await getLatestResults() as unknown as LotteryResult[]
  const resultsByDate = await groupResultsByDate(results) as unknown as GroupedResults
  const dates = Object.keys(resultsByDate).sort().reverse()
  
  // Calculate total pages for pagination info
  const totalItems = dates.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  
  // Get the date range for this page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, dates.length - 1)
  
  // Format dates for display in metadata
  let dateRangeText = ""
  if (dates.length > 0) {
    const oldestDate = formatDate(new Date(dates[endIndex]))
    const newestDate = formatDate(new Date(dates[startIndex]))
    dateRangeText = oldestDate === newestDate ? 
      `${newestDate}` : 
      `${oldestDate} to ${newestDate}`
  }
  
  const pageTitle = currentPage > 1 
    ? `Daily Millions Results History | Page ${currentPage} of ${totalPages}`
    : "Daily Millions Results History | Complete Archive"
    
  const pageDescription = currentPage > 1 
    ? `Browse Daily Millions lottery results history page ${currentPage}. View winning numbers and prize breakdowns from ${dateRangeText}.`
    : `Complete archive of Daily Millions lottery results. Browse winning numbers and prize breakdowns from all draws, organized by date.`
    
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: "Daily Millions history, lottery results archive, past winning numbers, Daily Million Plus, Irish lottery history",
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/history${currentPage > 1 ? `?page=${currentPage}` : ''}`,
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
      description: pageDescription,
      images: ["/DailyMillions-OG.webp"]
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/history${currentPage > 1 ? `?page=${currentPage}` : ''}`
    },
    // Pagination metadata for SEO
    ...(currentPage > 1 && {
      prev: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/history${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`
    }),
    ...(currentPage < totalPages && {
      next: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/history?page=${currentPage + 1}`
    })
  }
}

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string }
}) {
  try {
    // Await the searchParams if it's a promise
    const resolvedParams = await Promise.resolve(searchParams);
    // Get current page from query params or default to 1
    const currentPage = Number(resolvedParams.page) || 1

    // Fetch data on the server
    const results = (await getLatestResults() as unknown) as LotteryResult[]

    // Group results by date
    const resultsByDate = (await groupResultsByDate(results) as unknown) as GroupedResults

    // Calculate pagination
    const dates = Object.keys(resultsByDate).sort().reverse() // Sort dates in descending order
    const totalItems = dates.length
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    
    // Get paginated dates
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedDates = dates.slice(startIndex, endIndex)

    return (
      <div className="py-4">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": `Daily Millions Results History${currentPage > 1 ? ` - Page ${currentPage}` : ''}`,
                "description": "Complete archive of Daily Millions lottery results, showing winning numbers and prize breakdowns from past draws.",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/history${currentPage > 1 ? `?page=${currentPage}` : ''}`,
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "Daily Millions Results",
                  "url": process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"
                },
                "hasPart": paginatedDates.map(date => {
                  return {
                    "@type": "WebPage",
                    "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/${date}`,
                    "name": `Daily Millions Results for ${formatDate(new Date(date))}`,
                    "description": `View Daily Millions lottery results for ${formatDate(new Date(date))}, including winning numbers and prize breakdowns.`
                  }
                })
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
                    "name": "Results History",
                    "item": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/history`
                  }
                ]
              }
            ])
          }}
        />

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "History", isCurrentPage: true },
          ]}
        />

        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1 mb-3 h-8">
              <ArrowLeft className="h-3 w-3" />
              Back to Home
            </Button>
          </Link>

          {/* Updated hero section */}
          <div className="mb-4">
            <div className="text-center mb-6 pb-3 border-b">
              <h1 className="text-3xl font-bold mb-3">Daily Millions Results History</h1>
              <p className="text-base text-gray-700 leading-relaxed mb-4 max-w-3xl mx-auto">
                Are you looking for the Daily Millions Results History? Then You have come to the right place. Here in our history section, we provide complete Daily Millions Results History. Browse through any date you want to check previous winning numbers, see prize breakdowns, or track your favorite number combinations.
              </p>
              <div className="max-w-md mx-auto">
                <DatePicker 
                  className="bg-white text-gray-700 shadow-sm border" 
                  showIcon={true}
                  aria-label="Select date to view specific lottery results" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {paginatedDates.length > 0 ? (
            <>
              {paginatedDates.map((date) => {
                const results = resultsByDate[date]
                const displayDate = formatDate(new Date(date))

                return (
                  <section key={date} className="pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-blue-100 p-1.5 rounded-full">
                        <CalendarIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <h2 className="text-lg font-semibold">{displayDate}</h2>
                    </div>

                    <div className="space-y-3">
                      {results.map((result, index) => {
                        const drawDate = new Date(result.standard.drawDates[0])
                        const drawTime = getIrishTime(drawDate)
                        const drawType = drawDate.getHours() < 18 ? "Afternoon" : "Evening"

                        // Format time (9pm or 1pm format)
                        const hour = drawDate.getHours()
                        const ampm = hour >= 12 ? "pm" : "am"
                        const hour12 = hour % 12 || 12 // Convert 0 to 12 for 12am
                        const timeStr = `${hour12}${ampm}`

                        // Format day, date and month for link title
                        const day = drawDate.toLocaleDateString("en-IE", { weekday: "long", timeZone: "Europe/Dublin" })
                        const dayNum = drawDate.toLocaleDateString("en-IE", { day: "numeric", timeZone: "Europe/Dublin" })
                        const month = drawDate.toLocaleDateString("en-IE", { month: "long", timeZone: "Europe/Dublin" })
                        const year = drawDate.toLocaleDateString("en-IE", { year: "numeric", timeZone: "Europe/Dublin" })

                        // Card title for accessibility
                        const cardTitle = `Daily Millions Results for ${day} ${dayNum} ${month} ${year} (${timeStr})`

                        return (
                          <Link
                            href={`/results/${formatDateWithTimeForUrl(drawDate)}`}
                            key={index}
                            className="block"
                            aria-label={cardTitle}
                          >
                            <Card className="hover:shadow-md transition-shadow bg-blue-50">
                              <CardContent className="p-3">
                                {/* Draw Time Header */}
                                <div className="flex items-center justify-between mb-3 pb-2 border-b border-blue-100">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-blue-600" />
                                    <div className="font-medium text-sm">{drawType} Draw</div>
                                  </div>
                                  <div className="text-xs text-slate-500">{drawTime}</div>
                                </div>

                                {/* Draw Results */}
                                <div className="space-y-3">
                                  {/* Daily Million */}
                                  <div className="bg-white p-3 rounded-md shadow-sm">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                      {/* Game Logo and Jackpot */}
                                      <div className="flex-shrink-0 flex items-center justify-between sm:w-48 w-full">
                                        <div className="h-8 w-28 relative">
                                          <Image
                                            src="/DailyMillion.svg"
                                            alt={result.standard.gameTitle}
                                            fill
                                            className="object-contain object-left"
                                          />
                                        </div>
                                        <div>
                                          <div className="text-xs text-slate-500 uppercase">JACKPOT</div>
                                          <div className="text-sm font-bold text-blue-600">
                                            {result.standard.jackpotAmount}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Lottery Numbers */}
                                      <div className="flex-grow flex items-center justify-center gap-3">
                                        <div className="flex flex-wrap gap-1 justify-center">
                                          {result.standard.grids[0].standard[0].map((number, idx) => (
                                            <LotteryBall key={idx} number={number} variant="standard" size="sm" />
                                          ))}
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <span className="text-xs text-slate-500 uppercase">BONUS</span>
                                          <LotteryBall
                                            number={result.standard.grids[0].additional[0][0]}
                                            variant="bonus"
                                            size="sm"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Daily Million Plus */}
                                  <div className="bg-white p-3 rounded-md shadow-sm">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                      {/* Game Logo and Jackpot */}
                                      <div className="flex-shrink-0 flex items-center justify-between sm:w-48 w-full">
                                        <div className="h-8 w-28 relative">
                                          <Image
                                            src="/DailyMillionPlus.svg"
                                            alt={result.addonGames[0]?.gameTitle}
                                            fill
                                            className="object-contain object-left"
                                          />
                                        </div>
                                        <div>
                                          <div className="text-xs text-slate-500 uppercase">JACKPOT</div>
                                          <div className="text-sm font-bold text-blue-500">
                                            {result.addonGames[0]?.jackpotAmount}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Lottery Numbers */}
                                      <div className="flex-grow flex items-center justify-center gap-3">
                                        <div className="flex flex-wrap gap-1 justify-center">
                                          {result.addonGames[0].grids[0].standard[0].map((number, idx) => (
                                            <LotteryBall key={idx} number={number} variant="plus" size="sm" />
                                          ))}
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <span className="text-xs text-slate-500 uppercase">BONUS</span>
                                          <LotteryBall
                                            number={result.addonGames[0].grids[0].additional[0][0]}
                                            variant="bonus"
                                            size="sm"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* View Details Link */}
                                <div className="mt-2 text-right">
                                  <span className="text-xs text-blue-600 hover:underline">View Full Details →</span>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        )
                      })}
                    </div>
                  </section>
                )
              })}

              {/* Pagination */}
              <ClientPagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <div className="bg-blue-50 p-4 rounded-full inline-flex mb-4">
                <CalendarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Results Available</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any lottery results to display. Please check back later or try a different date.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in HistoryPage:", error)
    return (
      <div className="py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-6">We're having trouble loading the results history.</p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    )
  }
}
