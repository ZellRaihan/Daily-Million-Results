'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home, History, Info, HelpCircle } from 'lucide-react'
import Image from 'next/image'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'auto' : 'hidden'
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden ml-auto p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998] md:hidden transition-all duration-300 isolate ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 z-[9999] isolate ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Image
                src="/Daily-Millions-Logo.png"
                alt="Daily Millions Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
                loading="lazy"
              />
              <span className="font-semibold text-gray-900">Menu</span>
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Navigation */}
          <nav className="flex flex-col p-4 space-y-2">
            <Link
              href="/"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              href="/results/history"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <History className="h-5 w-5" />
              <span className="font-medium">History</span>
            </Link>
            <Link
              href="/about-us"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Info className="h-5 w-5" />
              <span className="font-medium">About</span>
            </Link>
            <Link
              href="/faq"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="font-medium">FAQ</span>
            </Link>
          </nav>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} Daily Millions
            </p>
          </div>
        </div>
      </div>
    </>
  )
} 