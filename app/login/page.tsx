"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Shield, Smartphone, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function LoginPage() {
  const { t, isRTL } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<"login" | "mfa" | "success">("login")
  const [mfaMethod, setMfaMethod] = useState<"sms" | "email">("sms")
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [mfaCode, setMfaCode] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login validation
    if (credentials.email && credentials.password) {
      setStep("mfa")
    }
  }

  const handleMFA = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate MFA validation
    if (mfaCode === "123456") {
      setStep("success")
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("loginSuccess")}</h2>
              <p className="text-gray-600 mb-4">{t("redirecting")}</p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className={`inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t("backToHome")}
          </Link>
          <div className={`flex items-center justify-center mb-4 ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CRAO</h1>
              <p className="text-sm text-gray-600">
                {t("heroSubtitle").replace(" - المغرب", "").replace(" - Maroc", "")}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="architect" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="architect">{t("architectSpace")}</TabsTrigger>
            <TabsTrigger value="agency">{t("agencySpace")}</TabsTrigger>
          </TabsList>

          <TabsContent value="architect">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  {step === "login" ? t("architectSpace") : t("twoFactorAuth")}
                </CardTitle>
                <CardDescription className="text-center">
                  {step === "login" ? t("connectToPersonalSpace") : t("twoFactorDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">{t("password")}</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={credentials.password}
                          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className={`absolute top-0 h-full px-3 py-2 hover:bg-transparent ${isRTL ? "left-0" : "right-0"}`}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      {t("login")}
                    </Button>
                    <div className="text-center">
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        {t("forgotPassword")}
                      </Link>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleMFA} className="space-y-4">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>{t("twoFactorDesc")}</AlertDescription>
                    </Alert>

                    <div className="flex gap-2 mb-4">
                      <Button
                        type="button"
                        variant={mfaMethod === "sms" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMfaMethod("sms")}
                        className="flex-1"
                      >
                        <Smartphone className="h-4 w-4 mr-2" />
                        SMS
                      </Button>
                      <Button
                        type="button"
                        variant={mfaMethod === "email" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMfaMethod("email")}
                        className="flex-1"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>

                    <div className="text-center mb-4">
                      <p className="text-sm text-gray-600">
                        {isRTL
                          ? `رمز مرسل عبر ${mfaMethod === "sms" ? "رسالة نصية إلى +212 6** ** ** 78" : "بريد إلكتروني إلى a***@email.com"}`
                          : `Code envoyé par ${mfaMethod === "sms" ? "SMS au +212 6** ** ** 78" : "email à a***@email.com"}`}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mfa-code">{t("verificationCode")}</Label>
                      <Input
                        id="mfa-code"
                        type="text"
                        placeholder="123456"
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value)}
                        maxLength={6}
                        className="text-center text-lg tracking-widest"
                        required
                      />
                    </div>

                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertDescription className="text-blue-800">
                        <strong>{isRTL ? "رمز الاختبار:" : "Code de test:"}</strong> 123456
                      </AlertDescription>
                    </Alert>

                    <Button type="submit" className="w-full">
                      {t("verifyCode")}
                    </Button>

                    <div className="text-center">
                      <Button type="button" variant="ghost" size="sm" onClick={() => setStep("login")}>
                        {t("backToLogin")}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agency">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">{t("agencySpace")}</CardTitle>
                <CardDescription className="text-center">{t("connectToAgencySpace")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agency-email">{isRTL ? "بريد الوكالة الإلكتروني" : "Email de l'agence"}</Label>
                    <Input id="agency-email" type="email" placeholder="agence@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-password">{t("password")}</Label>
                    <Input id="agency-password" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" className="w-full">
                    {t("login")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t("notRegistered")}{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              {t("createAccount")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
