"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import {
  History,
  Search,
  Filter,
  FileText,
  CreditCard,
  Shield,
  Ticket,
  User,
  Settings,
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Eye,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function HistoryPage() {
  const { t, isRTL } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("activities")

  const activities = [
    {
      id: 1,
      type: "contract",
      action: isRTL ? "إنشاء عقد جديد" : "Création d'un nouveau contrat",
      description: isRTL ? "مشروع مجمع سكني - الدار البيضاء" : "Projet complexe résidentiel - Casablanca",
      timestamp: "2024-01-15T10:30:00Z",
      status: "success",
      icon: FileText,
    },
    {
      id: 2,
      type: "payment",
      action: isRTL ? "دفعة مستلمة" : "Paiement reçu",
      description: isRTL ? "رسوم التسجيل السنوية - 1,500 درهم" : "Frais d'inscription annuelle - 1,500 MAD",
      timestamp: "2024-01-14T14:20:00Z",
      status: "success",
      icon: CreditCard,
    },
    {
      id: 3,
      type: "visa",
      action: isRTL ? "طلب تأشيرة رقمية" : "Demande de visa numérique",
      description: isRTL ? "مكتب تجاري - الرباط" : "Bureau commercial - Rabat",
      timestamp: "2024-01-13T09:15:00Z",
      status: "pending",
      icon: Shield,
    },
    {
      id: 4,
      type: "ticket",
      action: isRTL ? "فتح تذكرة دعم" : "Ouverture d'un ticket de support",
      description: isRTL ? "مشكلة في التحقق من الوثائق" : "Problème de vérification des documents",
      timestamp: "2024-01-12T16:45:00Z",
      status: "warning",
      icon: Ticket,
    },
    {
      id: 5,
      type: "profile",
      action: isRTL ? "تحديث الملف الشخصي" : "Mise à jour du profil",
      description: isRTL ? "تحديث معلومات الاتصال" : "Mise à jour des informations de contact",
      timestamp: "2024-01-11T11:30:00Z",
      status: "success",
      icon: User,
    },
    {
      id: 6,
      type: "settings",
      action: isRTL ? "تغيير الإعدادات" : "Modification des paramètres",
      description: isRTL ? "تفعيل الإشعارات عبر البريد الإلكتروني" : "Activation des notifications par email",
      timestamp: "2024-01-10T08:20:00Z",
      status: "success",
      icon: Settings,
    },
  ]

  const reminders = [
    {
      id: 1,
      title: isRTL ? "مراجعة العقد #2024-001" : "Révision contrat #2024-001",
      description: isRTL ? "مراجعة وتوقيع العقد قبل الموعد النهائي" : "Réviser et signer le contrat avant l'échéance",
      dueDate: "2024-02-15",
      priority: "high",
      completed: false,
      type: "contract",
    },
    {
      id: 2,
      title: isRTL ? "تقديم وثائق المشروع" : "Soumission documents projet",
      description: isRTL
        ? "تقديم الوثائق المطلوبة للمشروع الجديد"
        : "Soumettre les documents requis pour le nouveau projet",
      dueDate: "2024-02-20",
      priority: "medium",
      completed: false,
      type: "document",
    },
    {
      id: 3,
      title: isRTL ? "دفع رسوم التسجيل" : "Paiement frais d'inscription",
      description: isRTL ? "دفع رسوم التسجيل السنوية" : "Payer les frais d'inscription annuelle",
      dueDate: "2024-02-10",
      priority: "high",
      completed: true,
      type: "payment",
    },
    {
      id: 4,
      title: isRTL ? "اجتماع مع العميل" : "Réunion avec client",
      description: isRTL ? "مناقشة تفاصيل المشروع الجديد" : "Discuter des détails du nouveau projet",
      dueDate: "2024-02-25",
      priority: "low",
      completed: false,
      type: "meeting",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50"
      case "warning":
        return "text-yellow-600 bg-yellow-50"
      case "pending":
        return "text-blue-600 bg-blue-50"
      case "error":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString(isRTL ? "ar-MA" : "fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || activity.type === typeFilter
    return matchesSearch && matchesType
  })

  const stats = [
    {
      title: isRTL ? "إجمالي الأنشطة" : "Total Activités",
      value: activities.length.toString(),
      icon: History,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: isRTL ? "هذا الشهر" : "Ce Mois",
      value: activities.filter((a) => new Date(a.timestamp).getMonth() === new Date().getMonth()).length.toString(),
      icon: Calendar,
      color: "bg-green-100 text-green-800",
    },
    {
      title: isRTL ? "التذكيرات النشطة" : "Rappels Actifs",
      value: reminders.filter((r) => !r.completed).length.toString(),
      icon: Bell,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: isRTL ? "المهام المكتملة" : "Tâches Terminées",
      value: reminders.filter((r) => r.completed).length.toString(),
      icon: CheckCircle,
      color: "bg-purple-100 text-purple-800",
    },
  ]

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
              <BreadcrumbPage>{isRTL ? "السجل" : "Historique"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isRTL ? "السجل" : "Historique"}</h1>
            <p className="text-muted-foreground">
              {isRTL ? "تتبع جميع أنشطتك والتذكيرات" : "Suivez toutes vos activités et rappels"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="activities">{isRTL ? "الأنشطة" : "Activités"}</TabsTrigger>
            <TabsTrigger value="reminders">{isRTL ? "التذكيرات" : "Rappels"}</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "سجل الأنشطة" : "Journal d'Activités"}</CardTitle>
                <CardDescription>
                  {isRTL
                    ? "قائمة جميع الأنشطة والإجراءات المتخذة"
                    : "Liste de toutes les activités et actions effectuées"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 rtl:left-auto rtl:right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={isRTL ? "البحث في الأنشطة..." : "Rechercher dans les activités..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 rtl:pl-3 rtl:pr-8"
                      />
                    </div>
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder={isRTL ? "تصفية حسب النوع" : "Filtrer par type"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{isRTL ? "جميع الأنواع" : "Tous les types"}</SelectItem>
                      <SelectItem value="contract">{isRTL ? "العقود" : "Contrats"}</SelectItem>
                      <SelectItem value="payment">{isRTL ? "المدفوعات" : "Paiements"}</SelectItem>
                      <SelectItem value="visa">{isRTL ? "التأشيرة" : "Visa"}</SelectItem>
                      <SelectItem value="ticket">{isRTL ? "التذاكر" : "Tickets"}</SelectItem>
                      <SelectItem value="profile">{isRTL ? "الملف الشخصي" : "Profil"}</SelectItem>
                      <SelectItem value="settings">{isRTL ? "الإعدادات" : "Paramètres"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 rtl:space-x-reverse p-4 border rounded-lg"
                    >
                      <div className={`rounded-full p-2 ${getStatusColor(activity.status)}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">{activity.action}</p>
                          <span className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          {activity.type === "contract"
                            ? isRTL
                              ? "عقد"
                              : "Contrat"
                            : activity.type === "payment"
                              ? isRTL
                                ? "دفعة"
                                : "Paiement"
                              : activity.type === "visa"
                                ? isRTL
                                  ? "تأشيرة"
                                  : "Visa"
                                : activity.type === "ticket"
                                  ? isRTL
                                    ? "تذكرة"
                                    : "Ticket"
                                  : activity.type === "profile"
                                    ? isRTL
                                      ? "ملف شخصي"
                                      : "Profil"
                                    : activity.type === "settings"
                                      ? isRTL
                                        ? "إعدادات"
                                        : "Paramètres"
                                      : activity.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "التذكيرات والمهام" : "Rappels et Tâches"}</CardTitle>
                <CardDescription>
                  {isRTL ? "إدارة التذكيرات والمهام القادمة" : "Gérez vos rappels et tâches à venir"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`flex items-center space-x-4 rtl:space-x-reverse p-4 border rounded-lg ${reminder.completed ? "bg-gray-50" : ""}`}
                    >
                      <div className="flex-shrink-0">
                        {reminder.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : reminder.priority === "high" ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-sm font-medium ${reminder.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {reminder.title}
                          </p>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Badge variant="secondary" className={getPriorityColor(reminder.priority)}>
                              {reminder.priority === "high"
                                ? isRTL
                                  ? "عالية"
                                  : "Haute"
                                : reminder.priority === "medium"
                                  ? isRTL
                                    ? "متوسطة"
                                    : "Moyenne"
                                  : isRTL
                                    ? "منخفضة"
                                    : "Basse"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{reminder.dueDate}</span>
                          </div>
                        </div>
                        <p className={`text-sm text-muted-foreground ${reminder.completed ? "line-through" : ""}`}>
                          {reminder.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {!reminder.completed && (
                          <>
                            <Button variant="outline" size="sm">
                              {isRTL ? "تأجيل" : "Reporter"}
                            </Button>
                            <Button variant="default" size="sm">
                              {isRTL ? "تم" : "Terminé"}
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
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
