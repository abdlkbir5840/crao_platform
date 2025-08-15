"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Save, X, Edit, MapPin, Calendar, Building, Award, Plus, Download } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ProfilePage() {
  const { t, isRTL } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+212 6 12 34 56 78",
    dateOfBirth: "1985-03-15",
    address: "123 Rue Mohammed V, Casablanca",
    city: "Casablanca",
    country: "Morocco",

    // Professional Information
    registrationNumber: "ARCH-2020-001234",
    specializations: ["Architecture résidentielle", "Architecture commerciale"],
    experience: "15",
    company: "Cabinet d'Architecture Moderne",
    position: "Architecte Principal",
    bio: "Architecte expérimenté spécialisé dans les projets résidentiels et commerciaux avec plus de 15 ans d'expérience.",

    // Certifications
    certifications: [
      {
        id: 1,
        name: "Certification Architecture Durable",
        issuer: "Institut National d'Architecture",
        date: "2023-06-15",
        expiryDate: "2026-06-15",
        status: "active",
      },
      {
        id: 2,
        name: "Formation BIM Avancée",
        issuer: "Centre de Formation Technique",
        date: "2022-09-20",
        expiryDate: null,
        status: "completed",
      },
    ],
  })

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset changes logic here
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">{isRTL ? "لوحة التحكم" : "Dashboard"}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{isRTL ? "ملفي الشخصي" : "Mon Profil"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isRTL ? "ملفي الشخصي" : "Mon Profil"}</h1>
            <p className="text-muted-foreground">
              {isRTL ? "إدارة معلوماتك الشخصية والمهنية" : "Gérez vos informations personnelles et professionnelles"}
            </p>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  {isRTL ? "إلغاء" : "Annuler"}
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  {isRTL ? "حفظ" : "Enregistrer"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                {isRTL ? "تعديل" : "Modifier"}
              </Button>
            )}
          </div>
        </div>

        {/* Profile Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-lg">
                    {profileData.firstName[0]}
                    {profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="text-2xl font-bold">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-muted-foreground">{profileData.position}</p>
                <p className="text-sm text-muted-foreground">{profileData.company}</p>
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {profileData.city}, {profileData.country}
                  </div>
                  <div className="flex items-center">
                    <Building className="mr-1 h-3 w-3" />
                    {profileData.registrationNumber}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">{isRTL ? "المعلومات الشخصية" : "Informations Personnelles"}</TabsTrigger>
            <TabsTrigger value="professional">
              {isRTL ? "المعلومات المهنية" : "Informations Professionnelles"}
            </TabsTrigger>
            <TabsTrigger value="certifications">{isRTL ? "الشهادات" : "Certifications"}</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "المعلومات الشخصية" : "Informations Personnelles"}</CardTitle>
                <CardDescription>
                  {isRTL ? "معلوماتك الشخصية الأساسية" : "Vos informations personnelles de base"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{isRTL ? "الاسم الأول" : "Prénom"}</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{isRTL ? "اسم العائلة" : "Nom de famille"}</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{isRTL ? "البريد الإلكتروني" : "Email"}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{isRTL ? "رقم الهاتف" : "Téléphone"}</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">{isRTL ? "تاريخ الميلاد" : "Date de naissance"}</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">{isRTL ? "العنوان" : "Adresse"}</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">{isRTL ? "المدينة" : "Ville"}</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">{isRTL ? "البلد" : "Pays"}</Label>
                    <Select value={profileData.country} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Morocco">{isRTL ? "المغرب" : "Maroc"}</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Spain">{isRTL ? "إسبانيا" : "Espagne"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "المعلومات المهنية" : "Informations Professionnelles"}</CardTitle>
                <CardDescription>
                  {isRTL ? "تفاصيل مهنتك وخبرتك" : "Détails de votre profession et expérience"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">{isRTL ? "رقم التسجيل" : "Numéro d'inscription"}</Label>
                    <Input
                      id="registrationNumber"
                      value={profileData.registrationNumber}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({ ...profileData, registrationNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">{isRTL ? "سنوات الخبرة" : "Années d'expérience"}</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={profileData.experience}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">{isRTL ? "الشركة" : "Entreprise"}</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">{isRTL ? "المنصب" : "Poste"}</Label>
                    <Input
                      id="position"
                      value={profileData.position}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specializations">{isRTL ? "التخصصات" : "Spécialisations"}</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {profileData.specializations.map((spec, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                        {spec}
                        {isEditing && <button className="ml-1 text-blue-600 hover:text-blue-800">×</button>}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      {isRTL ? "إضافة تخصص" : "Ajouter spécialisation"}
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">{isRTL ? "السيرة المهنية" : "Biographie professionnelle"}</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    disabled={!isEditing}
                    rows={4}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{isRTL ? "الشهادات والتدريبات" : "Certifications et Formations"}</CardTitle>
                    <CardDescription>
                      {isRTL
                        ? "شهاداتك المهنية والتدريبات المكتملة"
                        : "Vos certifications professionnelles et formations complétées"}
                    </CardDescription>
                  </div>
                  {isEditing && (
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      {isRTL ? "إضافة شهادة" : "Ajouter certification"}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.certifications.map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Award className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold">{cert.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
                          <div className="flex items-center space-x-4 rtl:space-x-reverse mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {isRTL ? "تاريخ الإصدار:" : "Date d'émission:"} {cert.date}
                            </div>
                            {cert.expiryDate && (
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                {isRTL ? "تاريخ الانتهاء:" : "Date d'expiration:"} {cert.expiryDate}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              cert.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {cert.status === "active" ? (isRTL ? "نشط" : "Actif") : isRTL ? "مكتمل" : "Complété"}
                          </span>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
