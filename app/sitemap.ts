import { MetadataRoute } from 'next'
import { getLatestResults, groupResultsByDate } from "@/lib/actions"
import { formatDateWithTimeForUrl } from "@/lib/utils"

// Define types for lottery results
interface LotteryGrid {
  standard: number[][];
  additional: number[][];
}

interface LotteryGame {
  gameTitle: string;
  gameLogo: string;
  jackpotAmount: string;
  drawDates: string[];
  grids: LotteryGrid[];
}

interface LotteryResult {
  standard: LotteryGame;
  addonGames: LotteryGame[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from environment or default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailymillions.ie'
  
  // Get all results for dynamic routes
  const results = await getLatestResults()
  const resultsByDate = await groupResultsByDate(results)
  
  // Create dynamic entries for each result
  const resultEntries = Object.entries(resultsByDate).flatMap(([date, drawsArray]) => {
    return (drawsArray as LotteryResult[]).map(draw => {
      const drawDate = new Date(draw.standard.drawDates[0])
      return {
        url: `${baseUrl}/results/${formatDateWithTimeForUrl(drawDate)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    })
  })

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/results/history`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const, 
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
  ]

  return [...routes, ...resultEntries]
} 