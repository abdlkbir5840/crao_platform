"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Shield,
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function VisaPage() {
  const { t, isRTL } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewVisaOpen, setIsNewVisaOpen] = useState(false)

  const visaRequests = [
    {
      id: "VIS-2024-001",
      projectName: isRTL ? "مجمع سكني - الدار البيضاء" : "Complexe Résidentiel - Casablanca",
      projectType: isRTL ? "سكني" : "Résidentiel",
      location: isRTL ? "الدار البيضاء" : "Casablanca",
      submissionDate: "2024-01-15",
      status: "approved",
      reviewDate: "2024-01-20",
      surface: "2,500 m²",
      client: isRTL ? "شركة العمران" : "Société Al Omrane",
    },
    {
      id: "VIS-2024-002",
      projectName: isRTL ? "مكتب تجاري - الرباط" : "Bureau Commercial - Rabat",
      projectType: isRTL ? "تجاري" : "Commercial",
      location: isRTL ? "الرباط" : "Rabat",
      submissionDate: "2024-01-18",
      status: "under_review",
      reviewDate: null,
      surface: "1,200 m²",
      client: isRTL ? "مجموعة الأطلس" : "Groupe Atlas",
    },
    {
      id: "VIS-2024-003",
      projectName: isRTL ? "مدرسة ابتدائية - فاس" : "École Primaire - Fès",
      projectType: isRTL ? "تعليمي" : "Éducatif",
      location: isRTL ? "فاس" : "Fès",
      submissionDate: "2024-01-22",
      status: "submitted",
      reviewDate: null,
      surface: "3,000 m²",
      client: isRTL ? "وزارة التربية الوطنية" : "Ministère de l'Éducation",
    },
    {
      id: "VIS-2024-004",
      projectName: isRTL ? "مستشفى خاص - مراكش" : "Hôpital Privé - Marrakech",
      projectType: isRTL ? "صحي" : "Sanitaire",
      location: isRTL ? "مراكش" : "Marrakech",
      submissionDate: "2024-01-10",
      status: "rejected",
      reviewDate: "2024-01-25",
      surface: "5,000 m²",
      client: isRTL ? "مجموعة الصحة الخاصة" : "Groupe Santé Privée",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            {isRTL ? "معتمد" : "Approuvé"}
          </Badge>
        )
      case "under_review":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            {isRTL ? "قيد المراجعة" : "En Révision"}
          </Badge>
        )
      case "submitted":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            {isRTL ? "مقدم" : "Soumis"}
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            {isRTL ? "مرفوض" : "Rejeté"}
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredRequests = visaRequests.filter((request) => {
    const matchesSearch =
      request.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = [
    {
      title: isRTL ? "إجمالي الطلبات" : "Total Demandes",
      value: visaRequests.length.toString(),
      icon: Shield,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: isRTL ? "معتمد" : "Approuvées",
      value: visaRequests.filter((r) => r.status === "approved").length.toString(),
      icon: CheckCircle,
      color: "bg-green-100 text-green-800",
    },
    {
      title: isRTL ? "قيد المراجعة" : "En Révision",
      value: visaRequests.filter((r) => r.status === "under_review").length.toString(),
      icon: Clock,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: isRTL ? "مرفوض" : "Rejetées",
      value: visaRequests.filter((r) => r.status === "rejected").length.toString(),
      icon: XCircle,
      color: "bg-red-100 text-red-800",
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
              <BreadcrumbPage>{isRTL ? "التأشيرة الرقمية" : "Visa Numérique"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isRTL ? "التأشيرة الرقمية" : "Visa Numérique"}</h1>
            <p className="text-muted-foreground">
              {isRTL
                ? "إدارة طلبات التأشيرة الرقمية للمشاريع"
                : "Gérez vos demandes de visa numérique pour les projets"}
            </p>
          </div>
          <Dialog open={isNewVisaOpen} onOpenChange={setIsNewVisaOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {isRTL ? "طلب جديد" : "Nouvelle Demande"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{isRTL ? "طلب تأشيرة رقمية جديد" : "Nouvelle Demande de Visa Numérique"}</DialogTitle>
                <DialogDescription>
                  {isRTL
                    ? "املأ المعلومات المطلوبة لتقديم طلب تأشيرة رقمية جديد"
                    : "Remplissez les informations requises pour soumettre une nouvelle demande de visa numérique"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">{isRTL ? "اسم المشروع" : "Nom du Projet"}</Label>
                    <Input id="project-name" placeholder={isRTL ? "أدخل اسم المشروع" : "Entrez le nom du projet"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-type">{isRTL ? "نوع المشروع" : "Type de Projet"}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={isRTL ? "اختر النوع" : "Sélectionnez le type"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">{isRTL ? "سكني" : "Résidentiel"}</SelectItem>
                        <SelectItem value="commercial">{isRTL ? "تجاري" : "Commercial"}</SelectItem>
                        <SelectItem value="industrial">{isRTL ? "صناعي" : "Industriel"}</SelectItem>
                        <SelectItem value="educational">{isRTL ? "تعليمي" : "Éducatif"}</SelectItem>
                        <SelectItem value="healthcare">{isRTL ? "صحي" : "Sanitaire"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">{isRTL ? "الموقع" : "Localisation"}</Label>
                    <Input id="location" placeholder={isRTL ? "أدخل الموقع" : "Entrez la localisation"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surface">{isRTL ? "المساحة" : "Surface"}</Label>
                    <Input id="surface" placeholder={isRTL ? "المساحة بالمتر المربع" : "Surface en m²"} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">{isRTL ? "العميل" : "Client"}</Label>
                  <Input id="client" placeholder={isRTL ? "اسم العميل" : "Nom du client"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">{isRTL ? "وصف المشروع" : "Description du Projet"}</Label>
                  <Textarea
                    id="description"
                    placeholder={isRTL ? "وصف تفصيلي للمشروع" : "Description détaillée du projet"}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewVisaOpen(false)}>
                  {isRTL ? "إلغاء" : "Annuler"}
                </Button>
                <Button onClick={() => setIsNewVisaOpen(false)}>
                  {isRTL ? "تقديم الطلب" : "Soumettre la Demande"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? "طلبات التأشيرة" : "Demandes de Visa"}</CardTitle>
            <CardDescription>
              {isRTL ? "قائمة جميع طلبات التأشيرة الرقمية" : "Liste de toutes vos demandes de visa numérique"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 rtl:left-auto rtl:right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? "البحث في الطلبات..." : "Rechercher dans les demandes..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 rtl:pl-3 rtl:pr-8"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder={isRTL ? "تصفية حسب الحالة" : "Filtrer par statut"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isRTL ? "جميع الحالات" : "Tous les statuts"}</SelectItem>
                  <SelectItem value="submitted">{isRTL ? "مقدم" : "Soumis"}</SelectItem>
                  <SelectItem value="under_review">{isRTL ? "قيد المراجعة" : "En révision"}</SelectItem>
                  <SelectItem value="approved">{isRTL ? "معتمد" : "Approuvé"}</SelectItem>
                  <SelectItem value="rejected">{isRTL ? "مرفوض" : "Rejeté"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isRTL ? "رقم الطلب" : "N° Demande"}</TableHead>
                    <TableHead>{isRTL ? "المشروع" : "Projet"}</TableHead>
                    <TableHead>{isRTL ? "النوع" : "Type"}</TableHead>
                    <TableHead>{isRTL ? "الموقع" : "Localisation"}</TableHead>
                    <TableHead>{isRTL ? "تاريخ التقديم" : "Date Soumission"}</TableHead>
                    <TableHead>{isRTL ? "الحالة" : "Statut"}</TableHead>
                    <TableHead className="text-right">{isRTL ? "الإجراءات" : "Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.projectName}</div>
                          <div className="text-sm text-muted-foreground">{request.client}</div>
                        </div>
                      </TableCell>
                      <TableCell>{request.projectType}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {request.location}
                        </div>
                      </TableCell>
                      <TableCell>{request.submissionDate}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
