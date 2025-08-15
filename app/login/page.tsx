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

export default function LoginPage() {
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Connexion réussie</h2>
              <p className="text-gray-600 mb-4">Redirection en cours...</p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center justify-center mb-4 space-x-2">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CRAO</h1>
              <p className="text-sm text-gray-600">
                Conseil Régional de l'Ordre des Architectes
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="architect" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="architect">Espace Architecte</TabsTrigger>
            <TabsTrigger value="agency">Espace Agence</TabsTrigger>
          </TabsList>

          <TabsContent value="architect">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  {step === "login" ? "Espace Architecte" : "Authentification à deux facteurs"}
                </CardTitle>
                <CardDescription className="text-center">
                  {step === "login" ? "Connectez-vous à votre espace personnel" : "Veuillez saisir le code de vérification"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
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
                      <Label htmlFor="password">Mot de passe</Label>
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
                          className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Se connecter
                    </Button>
                    <div className="text-center">
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Mot de passe oublié ?
                      </Link>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleMFA} className="space-y-4">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>Veuillez saisir le code de vérification</AlertDescription>
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
                        {`Code envoyé par ${mfaMethod === "sms" ? "SMS au +212 6** ** ** 78" : "email à a***@email.com"}`}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mfa-code">Code de vérification</Label>
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
                        <strong>Code de test:</strong> 123456
                      </AlertDescription>
                    </Alert>

                    <Button type="submit" className="w-full">
                      Vérifier le code
                    </Button>

                    <div className="text-center">
                      <Button type="button" variant="ghost" size="sm" onClick={() => setStep("login")}>
                        Retour à la connexion
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
                <CardTitle className="text-center">Espace Agence</CardTitle>
                <CardDescription className="text-center">Connectez-vous à votre espace agence</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agency-email">Email de l'agence</Label>
                    <Input id="agency-email" type="email" placeholder="agence@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-password">Mot de passe</Label>
                    <Input id="agency-password" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Se connecter
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Pas encore inscrit ?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
