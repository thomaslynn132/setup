"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
// import { useAuthActions, useAuth } from "@/stores/auth-store"
import { Eye, EyeOff, Loader2 } from "lucide-react"

interface RegisterFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const t = useTranslations("auth")
  // const { register, clearError } = useAuthActions()
  // const { isLoading, error } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // clearError()

    if (formData.password !== formData.confirmPassword) {
      return
    }

    try {
      // await register(formData.email, formData.password, formData.name)
      onSuccess?.()
    } catch (error) {
      // Error is handled by the store
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const passwordsMatch = formData.password === formData.confirmPassword

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{t("register.title")}</CardTitle>
        <CardDescription className="text-center">{t("register.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )} */}

          <div className="space-y-2">
            <Label htmlFor="name">{t("register.name")}</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("register.name_placeholder")}
              required
              // disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("register.email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("register.email_placeholder")}
              required
              // disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("register.password")}</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder={t("register.password_placeholder")}
                required
                // disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                // disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("register.confirm_password")}</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t("register.confirm_password_placeholder")}
                required
                // disabled={isLoading}
                className={!passwordsMatch && formData.confirmPassword ? "border-destructive" : ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                // disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {!passwordsMatch && formData.confirmPassword && (
              <p className="text-sm text-destructive">{t("register.password_mismatch")}</p>
            )}
          </div>

          {/* <Button type="submit" className="w-full" disabled={isLoading || !passwordsMatch}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("register.creating_account")}
              </>
            ) : (
              t("register.create_account")
            )}
          </Button> */}

          {onSwitchToLogin && (
            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t("register.have_account")} </span>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={onSwitchToLogin}
                // disabled={isLoading}
              >
                {t("register.sign_in")}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
