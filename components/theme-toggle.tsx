"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 text-amber-700 dark:text-cyan-400 hover:bg-amber-100 dark:hover:bg-cyan-900/20 transition-all duration-200 rounded-full border border-transparent hover:border-amber-300 dark:hover:border-cyan-400 hover:shadow-md dark:hover:shadow-cyan-400/20"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
