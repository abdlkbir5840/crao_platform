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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Eye, Download, Edit, Calendar, MapPin, DollarSign } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ContractsPage() {
  const { t, isRTL } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewContractOpen, setIsNewContractOpen] = useState(false)

  const contracts = [
    {
      id: "CNT-001",
      title: isRTL ? "مجمع سكني - الدار البيضاء" : "Complexe Résidentiel - Casablanca",
      client: isRTL ? "شركة العمران المغربية" : "Société Al Omrane Maroc",
      status: "active",
      value: "2,500,000 MAD",
      startDate: "2024-01-15",
      endDate: "2024-12-15",
      progress: 75,
      location: isRTL ? "الدار البيضاء" : "Casablanca",
      type: isRTL ? "سكني" : "Résidentiel",
    },
    {
      id: "CNT-002",
      title: isRTL ? "مكتب تجاري - الرباط" : "Bureau Commercial - Rabat",
      client: isRTL ? "مجموعة أتيجاري وفا بنك" : "Groupe Attijariwafa Bank",
      status: "pending",
      value: "1,800,000 MAD",
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      progress: 45,
      location: isRTL ? "الرباط" : "Rabat",
      type: isRTL ? "تجاري" : "Commercial",
    },
    {
      id: "CNT-003",
      title: isRTL ? "فيلا خاصة - مراكش" : "Villa Privée - Marrakech",
      client: isRTL ? "السيد أحمد بنعلي" : "M. Ahmed Benali",
      status: "completed",
      value: "850,000 MAD",
      startDate: "2023-06-01",
      endDate: "2024-01-31",
      progress: 100,
      location: isRTL ? "مراكش" : "Marrakech",
      type: isRTL ? "سكني" : "Résidentiel",
    },
    {
      id: "CNT-004",
      title: isRTL ? "مصنع صناعي - طنجة" : "Usine Industrielle - Tanger",
      client: isRTL ? "شركة رونو المغرب" : "Renault Maroc",
      status: "draft",
      value: "5,200,000 MAD",
      startDate: "2024-03-01",
      endDate: "2025-02-28",
      progress: 10,
      location: isRTL ? "طنجة" : "Tanger",
      type: isRTL ? "صناعي" : "Industriel",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">{isRTL ? "نشط" : "Actif"}</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">{isRTL ? "في الانتظار" : "En Attente"}</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">{isRTL ? "مكتمل" : "Terminé"}</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">{isRTL ? "مسودة" : "Brouillon"}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = [
    {
      title: isRTL ? "إجمالي العقود" : "Total Contrats",
      value: contracts.length.toString(),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: isRTL ? "العقود النشطة" : "Contrats Actifs",
      value: contracts.filter((c) => c.status === "active").length.toString(),
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: isRTL ? "القيمة الإجمالية" : "Valeur Totale",
      value: "10.35M MAD",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
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
              <BreadcrumbPage>{isRTL ? "العقود" : "Contrats"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{isRTL ? "إدارة العقود" : "Gestion des Contrats"}</h2>
          <Dialog open={isNewContractOpen} onOpenChange={setIsNewContractOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {isRTL ? "عقد جديد" : "Nouveau Contrat"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{isRTL ? "إنشاء عقد جديد" : "Créer un Nouveau Contrat"}</DialogTitle>
                <DialogDescription>
                  {isRTL ? "أدخل تفاصيل العقد الجديد" : "Entrez les détails du nouveau contrat"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    {isRTL ? "عنوان المشروع" : "Titre du Projet"}
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="client" className="text-right">
                    {isRTL ? "العميل" : "Client"}
                  </Label>
                  <Input id="client" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="value" className="text-right">
                    {isRTL ? "قيمة العقد" : "Valeur du Contrat"}
                  </Label>
                  <Input id="value" className="col-span-3" placeholder="MAD" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    {isRTL ? "الموقع" : "Localisation"}
                  </Label>
                  <Input id="location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    {isRTL ? "الوصف" : "Description"}
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsNewContractOpen(false)}>
                  {isRTL ? "إنشاء العقد" : "Créer le Contrat"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isRTL ? "البحث في العقود..." : "Rechercher des contrats..."}
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
              <SelectItem value="active">{isRTL ? "نشط" : "Actif"}</SelectItem>
              <SelectItem value="pending">{isRTL ? "في الانتظار" : "En Attente"}</SelectItem>
              <SelectItem value="completed">{isRTL ? "مكتمل" : "Terminé"}</SelectItem>
              <SelectItem value="draft">{isRTL ? "مسودة" : "Brouillon"}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contracts Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredContracts.map((contract) => (
            <Card key={contract.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{contract.title}</CardTitle>
                  {getStatusBadge(contract.status)}
                </div>
                <CardDescription>{contract.client}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4" />
                      {contract.value}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {contract.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {contract.startDate}
                    </span>
                    <span>{contract.type}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{isRTL ? "التقدم" : "Progression"}</span>
                      <span>{contract.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${contract.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-1 h-4 w-4" />
                      {isRTL ? "عرض" : "Voir"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-1 h-4 w-4" />
                      {isRTL ? "تحميل" : "Télécharger"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-1 h-4 w-4" />
                      {isRTL ? "تعديل" : "Modifier"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContracts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold">{isRTL ? "لا توجد عقود" : "Aucun contrat trouvé"}</h3>
                <p className="text-muted-foreground mt-2">
                  {isRTL
                    ? "لم يتم العثور على عقود تطابق معايير البحث"
                    : "Aucun contrat ne correspond aux critères de recherche"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
