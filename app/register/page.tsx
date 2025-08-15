"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Phone,
  MapPin,
  GraduationCap,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Check,
  X,
  Building2,
  FileText,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface FormData {
  // Step 1: Personal Information
  civilite: string
  nom: string
  prenom: string
  cin: string
  dateNaissance: {
    jour: string
    mois: string
    annee: string
  }

  // Step 2: Contact Information
  mobile: string
  telephoneFixe: string
  fax: string
  siteWeb: string

  // Step 3: Addresses
  adresseProfessionnelle: {
    adresse: string
    prefecture: string
    commune: string
    codePostal: string
  }
  adresseDomicile: {
    adresse: string
    prefecture: string
    commune: string
    codePostal: string
  }

  // Step 4: Professional Information
  modeExercice: string
  typeDiplome: string
  dateObtentionDiplome: {
    jour: string
    mois: string
    annee: string
  }
  cnoa: string

  // Step 5: User Account
  nomUtilisateur: string
  email: string
  motDePasse: string
  confirmerMotDePasse: string
}

const initialFormData: FormData = {
  civilite: "",
  nom: "",
  prenom: "",
  cin: "",
  dateNaissance: { jour: "", mois: "", annee: "" },
  mobile: "",
  telephoneFixe: "",
  fax: "",
  siteWeb: "",
  adresseProfessionnelle: { adresse: "", prefecture: "", commune: "", codePostal: "" },
  adresseDomicile: { adresse: "", prefecture: "", commune: "", codePostal: "" },
  modeExercice: "",
  typeDiplome: "",
  dateObtentionDiplome: { jour: "", mois: "", annee: "" },
  cnoa: "",
  nomUtilisateur: "",
  email: "",
  motDePasse: "",
  confirmerMotDePasse: "",
}

export default function RegisterPage() {
  const { t, isRTL } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateNestedFormData = (parent: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof FormData],
        [field]: value,
      },
    }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.civilite &&
          formData.nom &&
          formData.prenom &&
          formData.cin &&
          formData.dateNaissance.jour &&
          formData.dateNaissance.mois &&
          formData.dateNaissance.annee
        )
      case 2:
        return !!formData.mobile
      case 3:
        return !!(
          formData.adresseProfessionnelle.adresse &&
          formData.adresseProfessionnelle.prefecture &&
          formData.adresseProfessionnelle.commune &&
          formData.adresseDomicile.adresse &&
          formData.adresseDomicile.prefecture &&
          formData.adresseDomicile.commune
        )
      case 4:
        return !!(
          formData.modeExercice &&
          formData.typeDiplome &&
          formData.dateObtentionDiplome.jour &&
          formData.dateObtentionDiplome.mois &&
          formData.dateObtentionDiplome.annee &&
          formData.cnoa
        )
      case 5:
        return !!(
          formData.nomUtilisateur &&
          formData.email &&
          formData.motDePasse &&
          formData.confirmerMotDePasse &&
          formData.motDePasse === formData.confirmerMotDePasse
        )
      default:
        return false
    }
  }

  const isStepCompleted = (step: number): boolean => {
    return step < currentStep || validateStep(step)
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)

    // Here you would typically redirect to a success page or login
    alert("Inscription réussie ! Vous pouvez maintenant vous connecter.")
  }

  const progress = (currentStep / 5) * 100

  // Generate day, month, year options
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0"))
  const months = [
    { value: "01", label: "Janvier" },
    { value: "02", label: "Février" },
    { value: "03", label: "Mars" },
    { value: "04", label: "Avril" },
    { value: "05", label: "Mai" },
    { value: "06", label: "Juin" },
    { value: "07", label: "Juillet" },
    { value: "08", label: "Août" },
    { value: "09", label: "Septembre" },
    { value: "10", label: "Octobre" },
    { value: "11", label: "Novembre" },
    { value: "12", label: "Décembre" },
  ]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 80 }, (_, i) => (currentYear - i).toString())

  const steps = [
    {
      id: 1,
      title: t("personalInfo"),
      description: t("personalInfoDesc"),
      icon: User,
    },
    {
      id: 2,
      title: t("contactInfo"),
      description: t("contactInfoDesc"),
      icon: Phone,
    },
    {
      id: 3,
      title: t("addresses"),
      description: t("addressesDesc"),
      icon: MapPin,
    },
    {
      id: 4,
      title: t("professionalInfo"),
      description: t("professionalInfoDesc"),
      icon: GraduationCap,
    },
    {
      id: 5,
      title: t("userAccount"),
      description: t("userAccountDesc"),
      icon: UserCheck,
    },
  ]

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("registerCRAO")}</h1>
          <p className="text-gray-600">{t("createAccountDesc")}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              {t("step")} {currentStep} {isRTL ? "من" : "sur"} 5
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% {t("completed")}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps Navigation */}
        <div className="flex justify-between mb-8 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = isStepCompleted(step.id)
            const isAccessible = step.id <= currentStep || isCompleted

            return (
              <div
                key={step.id}
                className={`flex flex-col items-center min-w-0 flex-1 ${index < steps.length - 1 ? (isRTL ? "ml-4" : "mr-4") : ""}`}
              >
                <button
                  onClick={() => isAccessible && setCurrentStep(step.id)}
                  disabled={!isAccessible}
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isActive
                      ? "bg-blue-600 text-white ring-4 ring-blue-200"
                      : isCompleted
                        ? "bg-green-600 text-white"
                        : isAccessible
                          ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isCompleted && !isActive ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </button>
                <div className="text-center">
                  <p
                    className={`text-xs font-medium ${
                      isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 hidden sm:block">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Form Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="civilite">{t("civility")} *</Label>
                    <Select value={formData.civilite} onValueChange={(value) => updateFormData("civilite", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? "اختر لقبك" : "Sélectionnez votre civilité"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M.">{isRTL ? "السيد" : "Monsieur"}</SelectItem>
                        <SelectItem value="Mme">{isRTL ? "السيدة" : "Madame"}</SelectItem>
                        <SelectItem value="Mlle">{isRTL ? "الآنسة" : "Mademoiselle"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cin">{t("cin")} *</Label>
                    <Input
                      id="cin"
                      value={formData.cin}
                      onChange={(e) => updateFormData("cin", e.target.value)}
                      placeholder={isRTL ? "رقم بطاقة الهوية" : "Numéro de carte d'identité"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom">{t("lastName")} *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => updateFormData("nom", e.target.value)}
                      placeholder={isRTL ? "اسم العائلة" : "Votre nom de famille"}
                    />
                  </div>
                  <div>
                    <Label htmlFor="prenom">{t("firstName")} *</Label>
                    <Input
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e) => updateFormData("prenom", e.target.value)}
                      placeholder={isRTL ? "اسمك الأول" : "Votre prénom"}
                    />
                  </div>
                </div>

                <div>
                  <Label>{t("birthDate")} *</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <Select
                      value={formData.dateNaissance.jour}
                      onValueChange={(value) => updateNestedFormData("dateNaissance", "jour", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? "اليوم" : "Jour"} />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={formData.dateNaissance.mois}
                      onValueChange={(value) => updateNestedFormData("dateNaissance", "mois", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? "الشهر" : "Mois"} />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={formData.dateNaissance.annee}
                      onValueChange={(value) => updateNestedFormData("dateNaissance", "annee", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? "السنة" : "Année"} />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mobile">Mobile *</Label>
                    <Input
                      id="mobile"
                      value={formData.mobile}
                      onChange={(e) => updateFormData("mobile", e.target.value)}
                      placeholder="Numéro de téléphone mobile"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telephoneFixe">Téléphone fixe</Label>
                    <Input
                      id="telephoneFixe"
                      value={formData.telephoneFixe}
                      onChange={(e) => updateFormData("telephoneFixe", e.target.value)}
                      placeholder="Numéro de téléphone fixe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fax">Fax</Label>
                    <Input
                      id="fax"
                      value={formData.fax}
                      onChange={(e) => updateFormData("fax", e.target.value)}
                      placeholder="Numéro de fax"
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteWeb">Site web</Label>
                    <Input
                      id="siteWeb"
                      value={formData.siteWeb}
                      onChange={(e) => updateFormData("siteWeb", e.target.value)}
                      placeholder="https://votre-site.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Addresses */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Adresse professionnelle *
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="adressePro">Adresse *</Label>
                      <Textarea
                        id="adressePro"
                        value={formData.adresseProfessionnelle.adresse}
                        onChange={(e) => updateNestedFormData("adresseProfessionnelle", "adresse", e.target.value)}
                        placeholder="Saisir votre adresse"
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="prefecturePro">Préfecture *</Label>
                        <Input
                          id="prefecturePro"
                          value={formData.adresseProfessionnelle.prefecture}
                          onChange={(e) => updateNestedFormData("adresseProfessionnelle", "prefecture", e.target.value)}
                          placeholder="Votre préfecture"
                        />
                      </div>
                      <div>
                        <Label htmlFor="communePro">Commune *</Label>
                        <Input
                          id="communePro"
                          value={formData.adresseProfessionnelle.commune}
                          onChange={(e) => updateNestedFormData("adresseProfessionnelle", "commune", e.target.value)}
                          placeholder="Votre commune"
                        />
                      </div>
                      <div>
                        <Label htmlFor="codePostalPro">Code postal</Label>
                        <Input
                          id="codePostalPro"
                          value={formData.adresseProfessionnelle.codePostal}
                          onChange={(e) => updateNestedFormData("adresseProfessionnelle", "codePostal", e.target.value)}
                          placeholder="Code postal"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Adresse domicile *
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="adresseDom">Adresse *</Label>
                      <Textarea
                        id="adresseDom"
                        value={formData.adresseDomicile.adresse}
                        onChange={(e) => updateNestedFormData("adresseDomicile", "adresse", e.target.value)}
                        placeholder="Saisir votre adresse"
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="prefectureDom">Préfecture *</Label>
                        <Input
                          id="prefectureDom"
                          value={formData.adresseDomicile.prefecture}
                          onChange={(e) => updateNestedFormData("adresseDomicile", "prefecture", e.target.value)}
                          placeholder="Votre préfecture"
                        />
                      </div>
                      <div>
                        <Label htmlFor="communeDom">Commune *</Label>
                        <Input
                          id="communeDom"
                          value={formData.adresseDomicile.commune}
                          onChange={(e) => updateNestedFormData("adresseDomicile", "commune", e.target.value)}
                          placeholder="Votre commune"
                        />
                      </div>
                      <div>
                        <Label htmlFor="codePostalDom">Code postal</Label>
                        <Input
                          id="codePostalDom"
                          value={formData.adresseDomicile.codePostal}
                          onChange={(e) => updateNestedFormData("adresseDomicile", "codePostal", e.target.value)}
                          placeholder="Code postal"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Professional Information */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="modeExercice">Mode d'exercice *</Label>
                    <Select
                      value={formData.modeExercice}
                      onValueChange={(value) => updateFormData("modeExercice", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre mode d'exercice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="liberal">Exercice libéral</SelectItem>
                        <SelectItem value="salarie">Salarié</SelectItem>
                        <SelectItem value="fonctionnaire">Fonctionnaire</SelectItem>
                        <SelectItem value="mixte">Exercice mixte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="typeDiplome">Type de diplôme *</Label>
                    <Input
                      id="typeDiplome"
                      value={formData.typeDiplome}
                      onChange={(e) => updateFormData("typeDiplome", e.target.value)}
                      placeholder="DESA, DPLG, DESA..."
                    />
                  </div>
                </div>

                <div>
                  <Label>Date d'obtention du diplôme *</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <Select
                      value={formData.dateObtentionDiplome.jour}
                      onValueChange={(value) => updateNestedFormData("dateObtentionDiplome", "jour", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Jour" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={formData.dateObtentionDiplome.mois}
                      onValueChange={(value) => updateNestedFormData("dateObtentionDiplome", "mois", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Mois" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={formData.dateObtentionDiplome.annee}
                      onValueChange={(value) => updateNestedFormData("dateObtentionDiplome", "annee", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Année" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="cnoa">CNOA *</Label>
                  <Input
                    id="cnoa"
                    value={formData.cnoa}
                    onChange={(e) => updateFormData("cnoa", e.target.value)}
                    placeholder="Numéro CNOA"
                  />
                </div>
              </div>
            )}

            {/* Step 5: User Account */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nomUtilisateur">Nom d'utilisateur *</Label>
                    <Input
                      id="nomUtilisateur"
                      value={formData.nomUtilisateur}
                      onChange={(e) => updateFormData("nomUtilisateur", e.target.value)}
                      placeholder="Choisissez un nom d'utilisateur"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Adresse e-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="motDePasse">Mot de passe *</Label>
                    <div className="relative">
                      <Input
                        id="motDePasse"
                        type={showPassword ? "text" : "password"}
                        value={formData.motDePasse}
                        onChange={(e) => updateFormData("motDePasse", e.target.value)}
                        placeholder="Choisissez un mot de passe"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmerMotDePasse">Confirmer mot de passe *</Label>
                    <div className="relative">
                      <Input
                        id="confirmerMotDePasse"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmerMotDePasse}
                        onChange={(e) => updateFormData("confirmerMotDePasse", e.target.value)}
                        placeholder="Confirmez votre mot de passe"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                {formData.motDePasse && formData.confirmerMotDePasse && (
                  <div className="flex items-center gap-2 text-sm">
                    {formData.motDePasse === formData.confirmerMotDePasse ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">Les mots de passe correspondent</span>
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4 text-red-600" />
                        <span className="text-red-600">Les mots de passe ne correspondent pas</span>
                      </>
                    )}
                  </div>
                )}

                {/* Summary */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Récapitulatif de votre inscription
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Nom complet:</strong> {formData.civilite} {formData.prenom} {formData.nom}
                      </p>
                      <p>
                        <strong>CIN:</strong> {formData.cin}
                      </p>
                      <p>
                        <strong>Mobile:</strong> {formData.mobile}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData.email}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Mode d'exercice:</strong> {formData.modeExercice}
                      </p>
                      <p>
                        <strong>Type de diplôme:</strong> {formData.typeDiplome}
                      </p>
                      <p>
                        <strong>CNOA:</strong> {formData.cnoa}
                      </p>
                      <p>
                        <strong>Nom d'utilisateur:</strong> {formData.nomUtilisateur}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 bg-transparent ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <ChevronLeft className="h-4 w-4" />
                {t("previous")}
              </Button>

              <div className="flex gap-2">
                {currentStep < 5 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    {t("next")}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!validateStep(5) || isSubmitting}
                    className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t("registrationInProgress")}
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4" />
                        {t("finalizeRegistration")}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              {t("login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
