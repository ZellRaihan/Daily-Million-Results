import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import {
  formatDate,
  formatShortDate,
  formatDateWithTimeForUrl,
  getIrishTime,
  getCurrentIrishDate,
  hasAfternoonDrawPassed,
  hasEveningDrawPassed,
  forceComingSoonState,
} from "@/lib/utils"
import { getLatestResults, groupResultsByDate } from "@/lib/actions"
import { LotteryBall } from "@/components/lottery-ball"
import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import { CalendarIcon, HistoryIcon, TrophyIcon, Clock, ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComingSoonResults } from "@/components/coming-soon-results"
import { CountdownTimer } from "@/components/countdown-timer"

// Add this function at the top level to fetch data once per request
async function getSharedData() {
  // Fetch data on the server
  const results = await getLatestResults()

  // Group results by date
  const resultsByDate = results && Array.isArray(results) 
    ? await groupResultsByDate(results)
    : {} as Record<string, any[]>;

  // Get the latest date
  const latestDate = Object.keys(resultsByDate)[0]
  const latestDraws = resultsByDate[latestDate] || []

  return { results, resultsByDate, latestDate, latestDraws };
}

export async function generateMetadata(): Promise<Metadata> {
  // Get shared data
  const { resultsByDate, latestDate } = await getSharedData();
  
  const formattedDate = latestDate ? formatDate(new Date(latestDate)) : "Today"
  
  return {
    title: "Daily Millions Results - Today 2PM & 9PM",
    description: "Check today's Daily Millions results, winning numbers and prize breakdowns. View both 2pm and 9pm draw results, plus comprehensive history of past draws.",
    keywords: "Daily Millions, Daily Million Plus, Irish Lottery, lottery results, winning numbers, jackpot, lottery prizes",
    openGraph: {
      title: "Daily Millions Results - Today 2PM & 9PM",
      description: "Check today's Daily Millions results, winning numbers and prize breakdowns. View both 2pm and 9pm draw results, plus comprehensive history of past draws.",
      type: "website",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/DailyMillions-OG.webp`,
          width: 1200,
          height: 630,
          alt: "Daily Millions Results"
        }
      ]
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"
    },
    twitter: {
      card: "summary_large_image",
      title: "Daily Millions Results - Today 2PM & 9PM",
      description: "Check today's Daily Millions results, winning numbers and prize breakdowns. View both 2pm and 9pm draw results.",
      images: [`${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/DailyMillions-OG.webp`]
    }
  }
}

export default async function HomePage() {
  // Get shared data
  const { results, resultsByDate, latestDate, latestDraws } = await getSharedData();

  // Find afternoon and evening draws
  const afternoonDraw = latestDraws.find((draw: any) => {
    const drawDate = new Date(draw.standard.drawDates[0])
    const dublinDate = new Date(drawDate.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
    return dublinDate.getHours() < 18
  })

  const eveningDraw = latestDraws.find((draw: any) => {
    const drawDate = new Date(draw.standard.drawDates[0])
    const dublinDate = new Date(drawDate.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
    return dublinDate.getHours() >= 18
  })

  // Format the date
  const formattedDate = latestDate ? formatDate(new Date(latestDate)) : "No results available"

  // Check if we need to show "Coming Soon" for evening draw
  // This would be true if:
  // 1. Today's afternoon draw has passed
  // 2. Today's evening draw has not passed
  // 3. We have afternoon results but not evening results
  const now = getCurrentIrishDate()
  const todayStr = now.toISOString().split("T")[0]
  const isLatestToday = latestDate === todayStr

  const showEveningComingSoon =
    forceComingSoonState() ||
    (isLatestToday && afternoonDraw && !eveningDraw && hasAfternoonDrawPassed() && !hasEveningDrawPassed())

  // Add structured data for SEO
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Daily Millions Results",
      "description": "Latest Daily Millions lottery results, winning numbers and prize breakdowns for both 2pm and 9pm draws.",
      "publisher": {
        "@type": "Organization",
        "name": "Daily Millions Results",
        "logo": {
          "@type": "ImageObject",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/DailyMillions-OG.webp`
        }
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"
          }
        ]
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Latest Daily Millions Results",
            "description": "Most recent lottery results for Daily Millions draws"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Daily Millions Prize Breakdown",
            "description": "Complete prize tiers and winning amounts for Daily Millions and Daily Millions Plus"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "How to Play Daily Millions",
            "description": "Instructions and rules for playing Daily Millions lottery"
          }
        ]
      },
      "faq": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the odds of winning the Daily Millions jackpot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The odds of matching all 6 numbers to win the €1,000,000 jackpot in Daily Millions are 1 in 3,262,623. While these odds are challenging, they're actually more favorable than many other lottery games, making Daily Millions one of the more accessible jackpot games available."
            }
          },
          {
            "@type": "Question",
            "name": "How long do I have to claim a Daily Millions prize?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You have 90 days from the date of the draw to claim your Daily Millions prize. For smaller prizes, you can claim at any authorized lottery retailer. For larger prizes (typically over €15,000), you'll need to claim directly from the National Lottery headquarters in Dublin."
            }
          },
          {
            "@type": "Question",
            "name": "Can I play Daily Millions online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can play Daily Millions online through the official National Lottery website or mobile app. Online play allows you to purchase tickets, select your numbers, and even set up recurring plays so you never miss a draw. Your tickets are stored securely in your online account, and you'll be notified automatically if you win."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if no one wins the jackpot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unlike some lottery games, Daily Millions does not have a rollover feature. The jackpot remains fixed at €1,000,000 for each draw, regardless of whether it was won in previous draws. This means every draw gives you the same chance to win the full €1 million prize."
            }
          },
          {
            "@type": "Question",
            "name": "What is the bonus number used for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The bonus number provides additional prize tiers in Daily Millions. While matching all 6 main numbers wins the jackpot, matching 5 main numbers plus the bonus number wins the second-tier prize (€10,000 in Daily Millions and €5,000 in Daily Millions Plus). Similarly, matching 4 main numbers plus the bonus, or 3 main numbers plus the bonus, also creates additional prize tiers."
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie",
      "name": "Daily Millions Results",
      "description": "Check today's Daily Millions results, winning numbers and prize breakdowns. View both 2pm and 9pm draw results.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": (process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie") + "/results/history?date={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    afternoonDraw && {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Daily Millions Afternoon Draw",
      "startDate": afternoonDraw.standard.drawDates[0],
      "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "VirtualLocation",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/${formatDateWithTimeForUrl(new Date(afternoonDraw.standard.drawDates[0]))}`
      },
      "description": `Daily Millions Afternoon Draw Results for ${formatDate(new Date(afternoonDraw.standard.drawDates[0]))}`,
      "offers": {
        "@type": "Offer",
        "price": "1",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "validFrom": "2020-01-01T00:00:00.000Z"
      },
      "organizer": {
        "@type": "Organization",
        "name": "Irish National Lottery",
        "url": "https://www.lottery.ie/"
      }
    },
    eveningDraw && {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Daily Millions Evening Draw",
      "startDate": eveningDraw.standard.drawDates[0],
      "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "VirtualLocation",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/results/${formatDateWithTimeForUrl(new Date(eveningDraw.standard.drawDates[0]))}`
      },
      "description": `Daily Millions Evening Draw Results for ${formatDate(new Date(eveningDraw.standard.drawDates[0]))}`,
      "offers": {
        "@type": "Offer",
        "price": "1",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "validFrom": "2020-01-01T00:00:00.000Z"
      },
      "organizer": {
        "@type": "Organization",
        "name": "Irish National Lottery",
        "url": "https://www.lottery.ie/"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Game",
      "name": "Daily Million",
      "description":
        "Play Daily Million for €1 per line for your chance to win a guaranteed €1,000,000 jackpot in draws held twice daily.",
      "gameLogo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/DailyMillion.svg`,
      "jackpotAmount": "€1,000,000"
    },
    {
      "@context": "https://schema.org",
      "@type": "Game",
      "name": "Daily Million Plus",
      "description":
        "Try Daily Million Plus for an extra €0.50 per line and get a second chance to win with the same numbers in a separate draw. Top prize €500,000.",
      "gameLogo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/DailyMillionPlus.svg`,
      "jackpotAmount": "€500,000"
    }
  ].filter(Boolean)

  return (
    <div className="py-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="mb-6">
        {/* Hero Section - No background box */}
        <div className="mb-6">
          <div className="p-2">
            {/* Content */}
            <div>
              {/* Title and subtitle - centered with border */}
              <div className="text-center mb-8 pb-5 border-b">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-800 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
                    Daily Millions Results
                  </span>
                </h1>
                <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
                  Check the latest lottery results and winning numbers for your chance at €1,000,000
                </p>
              </div>

              {/* Welcome message */}
              <div className="text-center mb-6 max-w-2xl mx-auto">
                <p className="text-gray-700 leading-relaxed">
                  Are you searching for the latest Daily Millions results?{" "}
                  <span className="font-semibold">Congratulations!</span> You've come to the right place. Check today's
                  winning numbers or browse through our history of past draws.
                </p>
              </div>

              {/* Date selector - above latest results */}
              <div className="max-w-md mx-auto mb-5">
                <div className="relative flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border">
                  <CalendarIcon className="h-4 w-4 text-gray-600 flex-shrink-0" aria-hidden="true" />
                  <div className="flex-grow">
                    <DatePicker 
                      className="bg-transparent text-gray-700 border-0 shadow-none hover:bg-gray-50 h-8 pl-0" 
                      aria-label="Select date to view lottery results"
                    />
                  </div>
                </div>
              </div>

              {/* Latest results cards */}
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-emerald-700 font-semibold flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Latest Results
                    </h3>
                    <div className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-medium border border-emerald-100">
                      {latestDraws && latestDraws.length > 0
                        ? formatDate(new Date(latestDraws[0].standard.drawDates[0]))
                        : "No results available"}
                    </div>
                  </div>

                  {latestDraws && latestDraws.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-3">
                      {/* Always show published results first */}
                      {/* Afternoon Draw */}
                      {afternoonDraw && (
                        <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                          {/* Draw Type Header - Centered with new color */}
                          <div className="flex justify-center mb-3">
                            <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full text-xs text-white font-medium flex items-center gap-1.5 shadow-sm">
                              <Clock className="h-3 w-3 text-white/80" />
                              <span>
                                Afternoon Draw • {getIrishTime(new Date(afternoonDraw.standard.drawDates[0]))}
                              </span>
                            </div>
                          </div>

                          {/* Daily Millions */}
                          <div className="bg-white rounded-md p-3 mb-3 border border-emerald-100">
                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-emerald-100">
                              <div className="h-8 w-28 relative">
                                <Image
                                  src="/DailyMillion.svg"
                                  alt={`${afternoonDraw.standard.gameTitle} Logo - €1,000,000 Jackpot Irish Lottery Game`}
                                  fill
                                  className="object-contain object-left"
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex items-center gap-1">
                                <TrophyIcon className="h-3.5 w-3.5 text-amber-500" />
                                <div className="text-xs font-bold text-emerald-700">
                                  {afternoonDraw.standard.jackpotAmount}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 justify-center">
                              {afternoonDraw.standard.grids[0].standard[0].map((number: number, idx: number) => (
                                <LotteryBall key={idx} number={number} variant="standard" size="sm" />
                              ))}
                              <div className="flex items-center gap-1 ml-1">
                                <span className="text-xs text-emerald-600">+</span>
                                <LotteryBall
                                  number={afternoonDraw.standard.grids[0].additional[0][0]}
                                  variant="bonus"
                                  size="sm"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Daily Millions Plus */}
                          <div className="bg-white rounded-md p-3 mb-3 border border-emerald-100">
                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-emerald-100">
                              <div className="h-8 w-28 relative">
                                <Image
                                  src="/DailyMillionPlus.svg"
                                  alt={`${afternoonDraw.addonGames[0].gameTitle} Logo - €500,000 Jackpot Irish Lottery Game`}
                                  fill
                                  className="object-contain object-left"
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex items-center gap-1">
                                <TrophyIcon className="h-3.5 w-3.5 text-amber-500" />
                                <div className="text-xs font-bold text-sky-600">
                                  {afternoonDraw.addonGames[0].jackpotAmount}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 justify-center">
                              {afternoonDraw.addonGames[0].grids[0].standard[0].map((number: number, idx: number) => (
                                <LotteryBall key={idx} number={number} variant="plus" size="sm" />
                              ))}
                              <div className="flex items-center gap-1 ml-1">
                                <span className="text-xs text-sky-600">+</span>
                                <LotteryBall
                                  number={afternoonDraw.addonGames[0].grids[0].additional[0][0]}
                                  variant="bonus"
                                  size="sm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <Link
                              href={`/results/${formatDateWithTimeForUrl(
                                new Date(afternoonDraw.standard.drawDates[0]),
                              )}`}
                              className="inline-block px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-full text-xs text-white font-medium"
                            >
                              View Full Details
                            </Link>
                          </div>
                        </div>
                      )}

                      {/* Evening Draw - Show Coming Soon if needed */}
                      {eveningDraw ? (
                        <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                          {/* Draw Type Header - Centered with new color */}
                          <div className="flex justify-center mb-3">
                            <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs text-white font-medium flex items-center gap-1.5 shadow-sm">
                              <Clock className="h-3 w-3 text-white/80" />
                              <span>Evening Draw • {getIrishTime(new Date(eveningDraw.standard.drawDates[0]))}</span>
                            </div>
                          </div>

                          {/* Daily Millions */}
                          <div className="bg-white rounded-md p-3 mb-3 border border-emerald-100">
                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-emerald-100">
                              <div className="h-8 w-28 relative">
                                <Image
                                  src="/DailyMillion.svg"
                                  alt={eveningDraw.standard.gameTitle}
                                  fill
                                  className="object-contain object-left"
                                />
                              </div>
                              <div className="flex items-center gap-1">
                                <TrophyIcon className="h-3.5 w-3.5 text-amber-500" />
                                <div className="text-xs font-bold text-emerald-700">
                                  {eveningDraw.standard.jackpotAmount}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 justify-center">
                              {eveningDraw.standard.grids[0].standard[0].map((number: number, idx: number) => (
                                <LotteryBall key={idx} number={number} variant="standard" size="sm" />
                              ))}
                              <div className="flex items-center gap-1 ml-1">
                                <span className="text-xs text-emerald-600">+</span>
                                <LotteryBall
                                  number={eveningDraw.standard.grids[0].additional[0][0]}
                                  variant="bonus"
                                  size="sm"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Daily Millions Plus */}
                          <div className="bg-white rounded-md p-3 mb-3 border border-emerald-100">
                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-emerald-100">
                              <div className="h-8 w-28 relative">
                                <Image
                                  src="/DailyMillionPlus.svg"
                                  alt={eveningDraw.addonGames[0].gameTitle}
                                  fill
                                  className="object-contain object-left"
                                />
                              </div>
                              <div className="flex items-center gap-1">
                                <TrophyIcon className="h-3.5 w-3.5 text-amber-500" />
                                <div className="text-xs font-bold text-sky-600">
                                  {eveningDraw.addonGames[0].jackpotAmount}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 justify-center">
                              {eveningDraw.addonGames[0].grids[0].standard[0].map((number: number, idx: number) => (
                                <LotteryBall key={idx} number={number} variant="plus" size="sm" />
                              ))}
                              <div className="flex items-center gap-1 ml-1">
                                <span className="text-xs text-sky-600">+</span>
                                <LotteryBall
                                  number={eveningDraw.addonGames[0].grids[0].additional[0][0]}
                                  variant="bonus"
                                  size="sm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <Link
                              href={`/results/${formatDateWithTimeForUrl(new Date(eveningDraw.standard.drawDates[0]))}`}
                              className="inline-block px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-full text-xs text-white font-medium"
                            >
                              View Full Details
                            </Link>
                          </div>
                        </div>
                      ) : showEveningComingSoon ? (
                        <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                          {/* Draw Type Header - Centered with new color */}
                          <div className="flex justify-center mb-3">
                            <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs text-white font-medium flex items-center gap-1.5 shadow-sm">
                              <Clock className="h-3 w-3 text-white/80" />
                              <span>Evening Draw • 9:00 PM • Results Coming Soon</span>
                            </div>
                          </div>

                          {/* Daily Millions - Coming Soon */}
                          <ComingSoonResults
                            gameTitle="Daily Million"
                            gameLogo="/DailyMillion.svg"
                            jackpotAmount="€1,000,000"
                            variant="standard"
                          />

                          {/* Daily Millions Plus - Coming Soon */}
                          <ComingSoonResults
                            gameTitle="Daily Million Plus"
                            gameLogo="/DailyMillionPlus.svg"
                            jackpotAmount="€500,000"
                            variant="plus"
                          />

                          {/* Countdown Timer */}
                          <div className="mt-4 text-center">
                            <div className="bg-amber-50 border border-amber-100 rounded-md p-3">
                              <CountdownTimer drawTime="9pm" />
                              <div className="text-xs text-amber-700 mt-2">Results will be available after 9:00 PM</div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-blue-50 p-4 rounded-full inline-flex mb-4">
                        <CalendarIcon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No Results Available</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        We couldn't find any lottery results to display. Please check back later.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Millions Results History Section */}
      <section className="mb-8 max-w-3xl mx-auto">
        {/* Centered heading with border below */}
        <div className="text-center mb-6 pb-3 border-b">
          <h2 className="text-lg font-bold">Daily Millions Results History</h2>
        </div>

        <div className="space-y-3">
          {Array.isArray(results) && results.slice(0, 5).map((result: any, index: number) => {
            const drawDate = new Date(result.standard.drawDates[0])
            const dublinDate = new Date(drawDate.toLocaleString("en-US", { timeZone: "Europe/Dublin" }))
            const drawType = dublinDate.getHours() < 18 ? "Afternoon" : "Evening"
            const badgeClass =
              drawType === "Evening"
                ? "bg-gradient-to-r from-amber-500 to-orange-500"
                : "bg-gradient-to-r from-blue-500 to-sky-500"

            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-white p-2.5 border-b flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 mb-1">
                      <CalendarIcon className="h-3 w-3 text-blue-500" />
                      <span className="text-xs font-medium">{formatShortDate(drawDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`px-2 py-0.5 ${badgeClass} rounded-full text-[10px] text-white font-medium inline-flex items-center gap-1 shadow-sm`}
                      >
                        <Clock className="h-2.5 w-2.5 text-white/80" />
                        <span>{drawType}</span>
                      </div>
                      <span className="text-[10px] text-gray-500">{getIrishTime(drawDate)}</span>
                    </div>
                  </div>
                  <Link
                    href={`/results/${formatDateWithTimeForUrl(drawDate)}`}
                    className="inline-flex items-center justify-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full text-[10px] text-white font-medium"
                  >
                    View
                    <ArrowRight className="h-2.5 w-2.5" />
                  </Link>
                </div>

                <div className="p-3">
                  <div className="space-y-3">
                    {/* Daily Millions */}
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                      <div className="min-w-[90px]">
                        <span className="text-xs font-medium text-blue-700">Daily Millions</span>
                      </div>
                      <div className="flex flex-wrap gap-1 items-center">
                        {result.standard.grids[0].standard[0].map((number: number, idx: number) => (
                          <LotteryBall key={idx} number={number} variant="standard" size="sm" />
                        ))}
                        <div className="flex items-center gap-0.5 ml-0.5">
                          <span className="text-[10px] text-blue-600">+</span>
                          <LotteryBall number={result.standard.grids[0].additional[0][0]} variant="bonus" size="sm" />
                        </div>
                      </div>
                    </div>

                    {/* Daily Millions Plus */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="min-w-[90px]">
                        <span className="text-xs font-medium text-sky-700">Daily Millions Plus</span>
                      </div>
                      <div className="flex flex-wrap gap-1 items-center">
                        {result.addonGames[0].grids[0].standard[0].map((number: number, idx: number) => (
                          <LotteryBall key={idx} number={number} variant="plus" size="sm" />
                        ))}
                        <div className="flex items-center gap-0.5 ml-0.5">
                          <span className="text-[10px] text-sky-600">+</span>
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
              </div>
            )
          })}
        </div>

        {/* View All History button below results list */}
        <div className="mt-4 text-center">
          <Link href="/results/history">
            <Button
              variant="default"
              size="sm"
              className="gap-1 h-9 px-5 bg-blue-600 text-white hover:bg-blue-700"
            >
              <HistoryIcon className="h-3.5 w-3.5 mr-1" />
              View All History
            </Button>
          </Link>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="mb-8 max-w-3xl mx-auto">
        <div className="text-center mb-6 pb-3 border-b">
          <h2 className="text-lg font-bold">About Daily Millions Lottery</h2>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="prose prose-sm max-w-none">
            <h3 className="text-base font-semibold mb-3">What is Daily Millions?</h3>
            <p className="mb-4">
              Daily Millions is Ireland's popular lottery game that gives players the chance to win €1,000,000 twice
              daily, seven days a week. With draws at 2pm and 9pm every day, Daily Millions offers more opportunities to
              become a millionaire than any other Irish lottery game. For more information about Irish lotteries, visit the{" "}
              <a 
                href="https://www.lottery.ie/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Irish National Lottery
              </a>{" "}
              official website.
            </p>

            <h3 className="text-base font-semibold mb-3">How to Play Daily Millions</h3>
            <p className="mb-4">
              Playing Daily Millions is simple. Select 6 numbers from 1-39, or choose a Quick Pick for randomly
              generated numbers. Each play costs €1. Match all 6 numbers drawn to win the jackpot prize of €1,000,000.
              There are also prizes for matching 3, 4, or 5 numbers, with or without the bonus number. Learn more about 
              lottery odds and probability from{" "}
              <a 
                href="https://www.mathsisfun.com/data/lottery-probability.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Maths is Fun
              </a>.
            </p>

            <h3 className="text-base font-semibold mb-3">Daily Millions Plus</h3>
            <p className="mb-4">
              For an additional €0.50 per line, players can add Daily Millions Plus to their ticket. This gives you a
              second chance to win with the same numbers in a separate draw with a top prize of €500,000. The Plus
              option offers the same prize tiers as the main game but with different prize amounts.
            </p>

            <h3 className="text-base font-semibold mb-3">Draw Schedule</h3>
            <div className="mb-4">
              <p className="mb-2">Daily Millions draws take place twice daily:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Afternoon Draw: 2:00 PM (14:00)</li>
                <li>Evening Draw: 9:00 PM (21:00)</li>
              </ul>
            </div>

            <h3 className="text-base font-semibold mb-3">Prize Breakdown</h3>
            <p className="mb-4">Daily Millions offers multiple ways to win with the following prize tiers:</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left">Match</th>
                    <th className="px-3 py-2 text-left">Daily Millions Prize</th>
                    <th className="px-3 py-2 text-left">Daily Millions Plus Prize</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-3 py-2">Match 6</td>
                    <td className="px-3 py-2">€1,000,000</td>
                    <td className="px-3 py-2">€500,000</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="px-3 py-2">Match 5 + Bonus</td>
                    <td className="px-3 py-2">€10,000</td>
                    <td className="px-3 py-2">€5,000</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-3 py-2">Match 5</td>
                    <td className="px-3 py-2">€500</td>
                    <td className="px-3 py-2">€250</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="px-3 py-2">Match 4 + Bonus</td>
                    <td className="px-3 py-2">€100</td>
                    <td className="px-3 py-2">€50</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-3 py-2">Match 4</td>
                    <td className="px-3 py-2">€25</td>
                    <td className="px-3 py-2">€15</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="px-3 py-2">Match 3 + Bonus</td>
                    <td className="px-3 py-2">€10</td>
                    <td className="px-3 py-2">€5</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-3 py-2">Match 3</td>
                    <td className="px-3 py-2">€3</td>
                    <td className="px-3 py-2">€2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-semibold mt-4 mb-3">Checking Your Results</h3>
            <p>
              Our website provides the most up-to-date Daily Millions results, allowing you to quickly check if you've
              won. You can view today's results, search for specific dates, or browse through our{" "}
              <Link 
                href="/results/history" 
                className="text-blue-600 hover:underline font-medium"
              >
                comprehensive results history
              </Link>. Remember to check your ticket against both the main numbers and the bonus number to see if you're
              a winner.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white px-4 py-12 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm font-medium">
                  What are the odds of winning the Daily Millions jackpot?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  The odds of matching all 6 numbers to win the €1,000,000 jackpot in Daily Millions are 1 in 3,262,623.
                  While these odds are challenging, they're actually more favorable than many other lottery games, making
                  Daily Millions one of the more accessible jackpot games available.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm font-medium">
                  How long do I have to claim a Daily Millions prize?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  You have 90 days from the date of the draw to claim your Daily Millions prize. For smaller prizes, you
                  can claim at any authorized lottery retailer. For larger prizes (typically over €15,000), you'll need to
                  claim directly from the National Lottery headquarters in Dublin.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm font-medium">Can I play Daily Millions online?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  Yes, you can play Daily Millions online through the official National Lottery website or mobile app.
                  Online play allows you to purchase tickets, select your numbers, and even set up recurring plays so you
                  never miss a draw. Your tickets are stored securely in your online account, and you'll be notified
                  automatically if you win.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm font-medium">
                  What happens if no one wins the jackpot?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  Unlike some lottery games, Daily Millions does not have a rollover feature. The jackpot remains fixed at
                  €1,000,000 for each draw, regardless of whether it was won in previous draws. This means every draw
                  gives you the same chance to win the full €1 million prize.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-sm font-medium">What is the bonus number used for?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  The bonus number provides additional prize tiers in Daily Millions. While matching all 6 main numbers
                  wins the jackpot, matching 5 main numbers plus the bonus number wins the second-tier prize (€10,000 in
                  Daily Millions and €5,000 in Daily Millions Plus). Similarly, matching 4 main numbers plus the bonus, or
                  3 main numbers plus the bonus, also creates additional prize tiers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-sm font-medium">Are Daily Millions prizes tax-free?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  Yes, all lottery prizes in Ireland, including Daily Millions prizes, are tax-free. The amount you win is
                  the amount you receive. However, once the money is in your possession, any interest earned or
                  investments made with your winnings may be subject to standard taxation rules.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-sm font-medium">
                  Can I play Daily Millions if I'm not in Ireland?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  While you need to purchase tickets within Ireland, you don't need to be an Irish citizen or resident to
                  play or claim prizes. Visitors to Ireland can purchase tickets while in the country. There are also
                  online lottery betting services that allow people from other countries to bet on the outcome of Daily
                  Millions draws, though these are not affiliated with the official National Lottery.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-sm font-medium">
                  What time are the Daily Millions results announced?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  Daily Millions draws take place twice daily at 2:00 PM (14:00) for the afternoon draw and 9:00 PM
                  (21:00) for the evening draw. Results are typically available on the official National Lottery website
                  and authorized retailers shortly after the draws. Our website updates the results as soon as they are
                  officially announced.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-sm font-medium">
                  How do I check if my Daily Millions ticket has won?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  You can check your Daily Millions ticket in several ways: use our website to view the latest results,
                  visit any authorized lottery retailer who can scan your ticket, check the official National Lottery
                  website or app, or watch the draw live. Remember to check both the main numbers and the bonus number to
                  determine if you've won any prize tier.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-sm font-medium">
                  Can I choose the same numbers for both Daily Millions and Daily Millions Plus?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  Yes, when you opt to play Daily Millions Plus as an add-on to your Daily Millions ticket, the same set
                  of numbers you selected for the main game will be used for the Plus game. This gives you two chances to
                  win with the same numbers, though the draws are separate and have different prize structures.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Link href="/faq">
                  View All FAQs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
