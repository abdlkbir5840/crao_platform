"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    const newLang = language === "fr" ? "ar" : "fr"
    setLanguage(newLang)
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex items-center gap-2 bg-transparent">
      <Globe className="h-4 w-4" />
      {language === "fr" ? "العربية" : "Français"}
    </Button>
  )
}
