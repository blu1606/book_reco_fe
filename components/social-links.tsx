"use client"

import { Github, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

export function SocialLinks() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/blu1606/BookRecommendation",
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/blue.hoang06/",
      icon: Facebook,
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "X",
      url: "https://x.com/Blues83769245",
      icon: () => (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "hover:text-black dark:hover:text-white",
    },
  ]

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 text-amber-700 dark:text-cyan-400 border border-transparent rounded-full transition-all duration-200 social-icon-hover ${link.color} hover:bg-white dark:hover:bg-gray-800 hover:shadow-md dark:hover:shadow-cyan-400/20 hover:border-black dark:hover:border-cyan-400`}
          asChild
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer" title={link.name}>
            <link.icon />
          </a>
        </Button>
      ))}
    </div>
  )
}
