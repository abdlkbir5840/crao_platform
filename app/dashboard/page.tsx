"use client"

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Ticket, CreditCard, Shield, TrendingUp, Plus, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function DashboardPage() {
  const { t, isRTL } = useLanguage()

  const stats = [
    {
      title: isRTL ? "العقود النشطة" : "Contrats Actifs",
      value: "12",
      change: "+2",
      changeType: "positive" as const,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: isRTL ? "التذاكر المفتوحة" : "Tickets Ouverts",
      value: "8",
      change: "-1",
      changeType: "positive" as const,
      icon: Ticket,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: isRTL ? "المدفوعات المعلقة" : "Paiements en Attente",
      value: "3",
      change: "0",
      changeType: "neutral" as const,
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: isRTL ? "طلبات التأشيرة" : "Demandes de Visa",
      value: "5",
      change: "+1",
      changeType: "positive" as const,
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "contract",
      title: isRTL ? "عقد جديد تم إنشاؤه" : "Nouveau contrat créé",
      description: isRTL ? "مشروع مجمع سكني - الدار البيضاء" : "Projet résidentiel - Casablanca",
      time: isRTL ? "منذ ساعتين" : "Il y a 2 heures",
      status: "success",
    },
    {
      id: 2,
      type: "payment",
      title: isRTL ? "دفعة مستلمة" : "Paiement reçu",
      description: isRTL ? "15,000 درهم - مشروع المكتب التجاري" : "15,000 MAD - Projet bureau commercial",
      time: isRTL ? "منذ 4 ساعات" : "Il y a 4 heures",
      status: "success",
    },
    {
      id: 3,
      type: "ticket",
      title: isRTL ? "تذكرة جديدة" : "Nouveau ticket",
      description: isRTL ? "مشكلة في تحميل المخططات" : "Problème de téléchargement des plans",
      time: isRTL ? "منذ يوم واحد" : "Il y a 1 jour",
      status: "pending",
    },
    {
      id: 4,
      type: "visa",
      title: isRTL ? "تأشيرة معتمدة" : "Visa approuvé",
      description: isRTL ? "تأشيرة رقمية للمشروع الجديد" : "Visa numérique pour nouveau projet",
      time: isRTL ? "منذ يومين" : "Il y a 2 jours",
      status: "success",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: isRTL ? "مراجعة المخططات المعمارية" : "Révision des plans architecturaux",
      dueDate: isRTL ? "غداً" : "Demain",
      priority: "high",
      project: isRTL ? "مشروع المجمع السكني" : "Projet résidentiel",
    },
    {
      id: 2,
      title: isRTL ? "اجتماع مع العميل" : "Réunion client",
      dueDate: isRTL ? "الجمعة" : "Vendredi",
      priority: "medium",
      project: isRTL ? "مكتب تجاري" : "Bureau commercial",
    },
    {
      id: 3,
      title: isRTL ? "تسليم التقرير النهائي" : "Livraison rapport final",
      dueDate: isRTL ? "الأسبوع القادم" : "Semaine prochaine",
      priority: "low",
      project: isRTL ? "فيلا خاصة" : "Villa privée",
    },
  ]

  return (
    <div className="flex flex-col">
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
              <BreadcrumbPage>{isRTL ? "نظرة عامة" : "Aperçu"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{isRTL ? "مرحباً، جون" : "Bonjour, John"}</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {isRTL ? "مشروع جديد" : "Nouveau Projet"}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`h-8 w-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={`inline-flex items-center ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {stat.change !== "0" && <TrendingUp className="mr-1 h-3 w-3" />}
                    {stat.change}
                  </span>{" "}
                  {isRTL ? "من الشهر الماضي" : "par rapport au mois dernier"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Activities */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>{isRTL ? "الأنشطة الأخيرة" : "Activités Récentes"}</CardTitle>
              <CardDescription>
                {isRTL ? "آخر التحديثات على مشاريعك" : "Dernières mises à jour sur vos projets"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>{isRTL ? "المهام القادمة" : "Tâches à Venir"}</CardTitle>
              <CardDescription>
                {isRTL ? "ما تحتاج إلى إنجازه قريباً" : "Ce que vous devez accomplir bientôt"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{task.title}</p>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {task.priority === "high"
                            ? isRTL
                              ? "عالية"
                              : "Haute"
                            : task.priority === "medium"
                              ? isRTL
                                ? "متوسطة"
                                : "Moyenne"
                              : isRTL
                                ? "منخفضة"
                                : "Basse"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.project}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {task.dueDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? "تقدم المشاريع" : "Progression des Projets"}</CardTitle>
            <CardDescription>
              {isRTL ? "نظرة عامة على حالة مشاريعك الحالية" : "Aperçu de l'état de vos projets actuels"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>RC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {isRTL ? "مجمع سكني - الدار البيضاء" : "Résidentiel Complex - Casablanca"}
                    </p>
                    <p className="text-sm text-muted-foreground">{isRTL ? "مرحلة التصميم" : "Phase de conception"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={75} className="w-20" />
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>BC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{isRTL ? "مكتب تجاري - الرباط" : "Bureau Commercial - Rabat"}</p>
                    <p className="text-sm text-muted-foreground">{isRTL ? "مرحلة البناء" : "Phase de construction"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={45} className="w-20" />
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>VP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{isRTL ? "فيلا خاصة - مراكش" : "Villa Privée - Marrakech"}</p>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? "مرحلة التخطيط" : "Phase de planification"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={20} className="w-20" />
                  <span className="text-sm font-medium">20%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
