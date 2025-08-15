"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User } from "lucide-react"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, isRTL } = useLanguage()

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("architectsDirectory"), href: "/architectes" },
    { name: t("projectCalls"), href: "/appels-projets" },
    { name: t("events"), href: "/evenements" },
    { name: t("documents"), href: "#doc-section" },
    { name: t("contactOrder"), href: "#contact" },
  ]

  return (
<header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className={`flex items-center space-x-2 ${isRTL ? "space-x-reverse" : ""}`}>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">CRAO</h1>
                <p className="text-xs text-gray-600">
                  {t("heroSubtitle").replace(" - المغرب", "").replace(" - Maroc", "")}
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={`flex items-center space-x-4 ${isRTL ? "space-x-reverse" : ""}`}>
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 bg-transparent">
                <User className="h-4 w-4" />
                {t("login")}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden bg-transparent">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "left" : "right"} className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full mt-4">
                      <User className="h-4 w-4 mr-2" />
                      {t("login")}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
