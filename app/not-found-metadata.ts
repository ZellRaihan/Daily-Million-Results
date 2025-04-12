import type { Metadata } from 'next'

// Metadata for 404 page
export const notFoundMetadata: Metadata = {
  title: "Page Not Found | Daily Millions Results",
  description: "Sorry, the page you are looking for could not be found. Please check our latest lottery results or browse the history.",
  robots: {
    index: false,
    follow: true
  }
} 