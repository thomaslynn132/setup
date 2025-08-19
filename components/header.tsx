"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthModal } from "@/components/auth/auth-modal"
import { UserMenu } from "@/components/auth/user-menu"
import { InstallButton } from "@/components/pwa/install-button"
import { useAuth } from "@/stores/auth-store"
import { Menu, X, Globe } from "lucide-react"

export function Header() {
  const t = useTranslations("header")
  const { isLoggedIn } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const navItems = [
    { key: "home", href: "#home" },
    { key: "features", href: "#features" },
    { key: "about", href: "#about" },
    { key: "contact", href: "#contact" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-2"
            >
              <Globe className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">GlobalTech</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  {t(`nav.${item.key}`)}
                </motion.a>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              <InstallButton />
              <LanguageSwitcher />
              <ThemeToggle />

              {isLoggedIn ? (
                <UserMenu />
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)}>{t("auth.sign_in")}</Button>
              )}

              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-border"
            >
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="block py-2 text-foreground hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}

              {!isLoggedIn && (
                <Button
                  className="mt-4 w-full"
                  onClick={() => {
                    setIsAuthModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  {t("auth.sign_in")}
                </Button>
              )}
            </motion.nav>
          )}
        </div>
      </motion.header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
