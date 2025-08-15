"use client"

import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Plus,
  Search,
  Eye,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  User,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function TicketsPage() {
  const { t, isRTL } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)

  const tickets = [
    {
      id: "TKT-001",
      title: isRTL ? "مشكلة في تحميل المخططات" : "Problème de téléchargement des plans",
      description: isRTL
        ? "لا يمكنني تحميل المخططات المعمارية للمشروع الجديد"
        : "Impossible de télécharger les plans architecturaux du nouveau projet",
      status: "open",
      priority: "high",
      category: isRTL ? "تقني" : "Technique",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-16T14:20:00Z",
      assignedTo: isRTL ? "فريق الدعم التقني" : "Équipe Support Technique",
      project: isRTL ? "مجمع سكني - الدار البيضاء" : "Complexe Résidentiel - Casablanca",
      messages: [
        {
          id: 1,
          author: "John Doe",
          content: isRTL ? "أواجه مشكلة في تحميل المخططات" : "J'ai un problème avec le téléchargement des plans",
          timestamp: "2024-01-15T10:30:00Z",
          isUser: true,
        },
        {
          id: 2,
          author: isRTL ? "فريق الدعم" : "Support Team",
          content: isRTL ? "نحن نعمل على حل هذه المشكلة" : "Nous travaillons sur la résolution de ce problème",
          timestamp: "2024-01-16T14:20:00Z",
          isUser: false,
        },
      ],
    },
    {
      id: "TKT-002",
      title: isRTL ? "طلب تعديل في العقد" : "Demande de modification du contrat",
      description: isRTL
        ? "أحتاج إلى تعديل بعض البنود في العقد الحالي"
        : "J'ai besoin de modifier certaines clauses du contrat actuel",
      status: "in_progress",
      priority: "medium",
      category: isRTL ? "قانوني" : "Juridique",
      createdAt: "2024-01-14T09:15:00Z",
      updatedAt: "2024-01-16T11:45:00Z",
      assignedTo: isRTL ? "الفريق القانوني" : "Équipe Juridique",
      project: isRTL ? "مكتب تجاري - الرباط" : "Bureau Commercial - Rabat",
      messages: [
        {
          id: 1,
          author: "John Doe",
          content: isRTL ? "أريد تعديل المادة 5 من العقد" : "Je souhaite modifier l'article 5 du contrat",
          timestamp: "2024-01-14T09:15:00Z",
          isUser: true,
        },
      ],
    },
    {
      id: "TKT-003",
      title: isRTL ? "استفسار حول الدفع" : "Question sur le paiement",
      description: isRTL
        ? "لدي سؤال حول آلية الدفع للمشروع"
        : "J'ai une question concernant le processus de paiement du projet",
      status: "resolved",
      priority: "low",
      category: isRTL ? "مالي" : "Financier",
      createdAt: "2024-01-10T16:20:00Z",
      updatedAt: "2024-01-12T10:30:00Z",
      assignedTo: isRTL ? "الفريق المالي" : "Équipe Financière",
      project: isRTL ? "فيلا خاصة - مراكش" : "Villa Privée - Marrakech",
      messages: [
        {
          id: 1,
          author: "John Doe",
          content: isRTL ? "متى موعد الدفعة القادمة؟" : "Quand est la prochaine échéance de paiement?",
          timestamp: "2024-01-10T16:20:00Z",
          isUser: true,
        },
        {
          id: 2,
          author: isRTL ? "الفريق المالي" : "Équipe Financière",
          content: isRTL ? "الدفعة القادمة في 15 فبراير" : "Le prochain paiement est prévu le 15 février",
          timestamp: "2024-01-12T10:30:00Z",
          isUser: false,
        },
      ],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            {isRTL ? "مفتوح" : "Ouvert"}
          </Badge>
        )
      case "in_progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" />
            {isRTL ? "قيد المعالجة" : "En Cours"}
          </Badge>
        )
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            {isRTL ? "محلول" : "Résolu"}
          </Badge>
        )
      case "closed":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <XCircle className="mr-1 h-3 w-3" />
            {isRTL ? "مغلق" : "Fermé"}
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">{isRTL ? "عالية" : "Haute"}</Badge>
      case "medium":
        return <Badge variant="default">{isRTL ? "متوسطة" : "Moyenne"}</Badge>
      case "low":
        return <Badge variant="secondary">{isRTL ? "منخفضة" : "Basse"}</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = [
    {
      title: isRTL ? "إجمالي التذاكر" : "Total Tickets",
      value: tickets.length.toString(),
      color: "text-blue-600",
    },
    {
      title: isRTL ? "التذاكر المفتوحة" : "Tickets Ouverts",
      value: tickets.filter((t) => t.status === "open").length.toString(),
      color: "text-red-600",
    },
    {
      title: isRTL ? "قيد المعالجة" : "En Cours",
      value: tickets.filter((t) => t.status === "in_progress").length.toString(),
      color: "text-yellow-600",
    },
    {
      title: isRTL ? "محلولة" : "Résolus",
      value: tickets.filter((t) => t.status === "resolved").length.toString(),
      color: "text-green-600",
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
              <BreadcrumbPage>{isRTL ? "التذاكر" : "Tickets"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{isRTL ? "إدارة التذاكر" : "Gestion des Tickets"}</h2>
          <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {isRTL ? "تذكرة جديدة" : "Nouveau Ticket"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{isRTL ? "إنشاء تذكرة جديدة" : "Créer un Nouveau Ticket"}</DialogTitle>
                <DialogDescription>
                  {isRTL ? "أدخل تفاصيل المشكلة أو الاستفسار" : "Entrez les détails de votre problème ou question"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    {isRTL ? "العنوان" : "Titre"}
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    {isRTL ? "الفئة" : "Catégorie"}
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={isRTL ? "اختر الفئة" : "Sélectionner une catégorie"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">{isRTL ? "تقني" : "Technique"}</SelectItem>
                      <SelectItem value="legal">{isRTL ? "قانوني" : "Juridique"}</SelectItem>
                      <SelectItem value="financial">{isRTL ? "مالي" : "Financier"}</SelectItem>
                      <SelectItem value="general">{isRTL ? "عام" : "Général"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    {isRTL ? "الأولوية" : "Priorité"}
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={isRTL ? "اختر الأولوية" : "Sélectionner la priorité"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">{isRTL ? "عالية" : "Haute"}</SelectItem>
                      <SelectItem value="medium">{isRTL ? "متوسطة" : "Moyenne"}</SelectItem>
                      <SelectItem value="low">{isRTL ? "منخفضة" : "Basse"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    {isRTL ? "الوصف" : "Description"}
                  </Label>
                  <Textarea id="description" className="col-span-3" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsNewTicketOpen(false)}>
                  {isRTL ? "إنشاء التذكرة" : "Créer le Ticket"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isRTL ? "البحث في التذاكر..." : "Rechercher des tickets..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={isRTL ? "تصفية حسب الحالة" : "Filtrer par statut"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isRTL ? "جميع الحالات" : "Tous les statuts"}</SelectItem>
              <SelectItem value="open">{isRTL ? "مفتوح" : "Ouvert"}</SelectItem>
              <SelectItem value="in_progress">{isRTL ? "قيد المعالجة" : "En Cours"}</SelectItem>
              <SelectItem value="resolved">{isRTL ? "محلول" : "Résolu"}</SelectItem>
              <SelectItem value="closed">{isRTL ? "مغلق" : "Fermé"}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={isRTL ? "تصفية حسب الأولوية" : "Filtrer par priorité"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isRTL ? "جميع الأولويات" : "Toutes les priorités"}</SelectItem>
              <SelectItem value="high">{isRTL ? "عالية" : "Haute"}</SelectItem>
              <SelectItem value="medium">{isRTL ? "متوسطة" : "Moyenne"}</SelectItem>
              <SelectItem value="low">{isRTL ? "منخفضة" : "Basse"}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CardTitle className="text-lg">{ticket.title}</CardTitle>
                    {getStatusBadge(ticket.status)}
                    {getPriorityBadge(ticket.priority)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedTicket(ticket)}>
                          <Eye className="mr-1 h-4 w-4" />
                          {isRTL ? "عرض" : "Voir"}
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-[400px] sm:w-[540px]">
                        <SheetHeader>
                          <SheetTitle>{ticket.title}</SheetTitle>
                          <SheetDescription>
                            {isRTL ? "تفاصيل التذكرة ومحادثة الدعم" : "Détails du ticket et conversation support"}
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">{isRTL ? "الحالة" : "Statut"}</Label>
                              <div className="mt-1">{getStatusBadge(ticket.status)}</div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">{isRTL ? "الأولوية" : "Priorité"}</Label>
                              <div className="mt-1">{getPriorityBadge(ticket.priority)}</div>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">{isRTL ? "الفئة" : "Catégorie"}</Label>
                            <p className="mt-1 text-sm">{ticket.category}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">{isRTL ? "المشروع" : "Projet"}</Label>
                            <p className="mt-1 text-sm">{ticket.project}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">{isRTL ? "الوصف" : "Description"}</Label>
                            <p className="mt-1 text-sm text-muted-foreground">{ticket.description}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">{isRTL ? "المحادثة" : "Conversation"}</Label>
                            <div className="mt-2 space-y-3 max-h-60 overflow-y-auto">
                              {ticket.messages.map((message) => (
                                <div
                                  key={message.id}
                                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                                >
                                  <div
                                    className={`max-w-[80%] rounded-lg p-3 ${
                                      message.isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                                    }`}
                                  >
                                    <div className="flex items-center space-x-2 mb-1">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback className="text-xs">
                                          {message.author
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-xs font-medium">{message.author}</span>
                                    </div>
                                    <p className="text-sm">{message.content}</p>
                                    <p className="text-xs opacity-70 mt-1">
                                      {new Date(message.timestamp).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Input
                              placeholder={isRTL ? "اكتب رسالة..." : "Tapez votre message..."}
                              className="flex-1"
                            />
                            <Button size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
                <CardDescription>{ticket.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      {ticket.assignedTo}
                    </span>
                  </div>
                  <span className="flex items-center">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    {ticket.messages.length} {isRTL ? "رسائل" : "messages"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold">{isRTL ? "لا توجد تذاكر" : "Aucun ticket trouvé"}</h3>
                <p className="text-muted-foreground mt-2">
                  {isRTL
                    ? "لم يتم العثور على تذاكر تطابق معايير البحث"
                    : "Aucun ticket ne correspond aux critères de recherche"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
