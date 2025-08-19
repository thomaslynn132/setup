"use client"

import { useTranslations } from "next-intl"
import { Globe, Twitter, Github, Linkedin } from "lucide-react"

export function Footer() {
  const t = useTranslations("footer")

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  const footerLinks = [
    {
      title: t("links.product.title"),
      links: [
        { label: t("links.product.features"), href: "#features" },
        { label: t("links.product.pricing"), href: "#" },
        { label: t("links.product.docs"), href: "#" },
      ],
    },
    {
      title: t("links.company.title"),
      links: [
        { label: t("links.company.about"), href: "#about" },
        { label: t("links.company.careers"), href: "#" },
        { label: t("links.company.contact"), href: "#contact" },
      ],
    },
    {
      title: t("links.support.title"),
      links: [
        { label: t("links.support.help"), href: "#" },
        { label: t("links.support.status"), href: "#" },
        { label: t("links.support.community"), href: "#" },
      ],
    },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-card-foreground">GlobalTech</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md font-serif">{t("description")}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-card-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">{t("copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
              {t("legal.privacy")}
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
              {t("legal.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
