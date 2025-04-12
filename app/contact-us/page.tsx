"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, MessageSquare, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function ContactUsPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // In a real application, you would send this data to your backend
      // For demo purposes, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form submitted:", formState)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (err) {
      setError("There was an error submitting your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-6">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Daily Millions Results",
              "description": "Contact page for Daily Millions Results website",
              "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/contact-us`,
              "mainEntity": {
                "@type": "Organization",
                "name": "Daily Millions Results",
                "email": "contact@dailymillionsresults.com",
                "url": process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"
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
                  "name": "Contact Us",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || "https://dailymillions.ie"}/contact-us`
                }
              ]
            }
          ])
        }}
      />
      
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contact Us", isCurrentPage: true },
        ]}
      />

      <div className="mb-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1 mb-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
        <h1 className="text-2xl font-bold mb-6 pb-2 border-b">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Have questions, suggestions, or feedback about our Daily Millions Results website? We'd love to hear from
              you! Fill out the form and our team will get back to you as soon as possible.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-sm text-gray-600">contact@dailymillionsresults.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Response Time</h3>
                  <p className="text-sm text-gray-600">We aim to respond to all inquiries within 24-48 hours.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Please Note</h3>
              <p className="text-sm text-blue-700">
                This website is not affiliated with the official National Lottery. For official inquiries about lottery
                games, prizes, or claims, please contact the National Lottery directly.
              </p>
            </div>
          </div>

          <div>
            {isSubmitted ? (
              <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                  <Send className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h2>
                <p className="text-green-700 mb-4">
                  Thank you for reaching out. We've received your message and will get back to you soon.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-100"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry..."
                    rows={5}
                    required
                  />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
