"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { CreditCard, Plus, Search, Filter, Download, CheckCircle, Clock, AlertCircle, DollarSign } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function PaymentsPage() {
  const { t, isRTL } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewPaymentOpen, setIsNewPaymentOpen] = useState(false)

  const payments = [
    {
      id: "PAY-2024-001",
      description: isRTL ? "رسوم التسجيل السنوية" : "Frais d'inscription annuelle",
      amount: 1500,
      currency: "MAD",
      dueDate: "2024-02-15",
      paidDate: "2024-02-10",
      status: "paid",
      method: isRTL ? "تحويل بنكي" : "Virement bancaire",
      invoice: "INV-2024-001",
    },
    {
      id: "PAY-2024-002",
      description: isRTL ? "رسوم مراجعة المشروع" : "Frais de révision de projet",
      amount: 800,
      currency: "MAD",
      dueDate: "2024-02-20",
      paidDate: null,
      status: "pending",
      method: null,
      invoice: "INV-2024-002",
    },
    {
      id: "PAY-2024-003",
      description: isRTL ? "رسوم التأشيرة الرقمية" : "Frais de visa numérique",
      amount: 500,
      currency: "MAD",
      dueDate: "2024-01-30",
      paidDate: null,
      status: "overdue",
      method: null,
      invoice: "INV-2024-003",
    },
    {
      id: "PAY-2024-004",
      description: isRTL ? "رسوم الاستشارة التقنية" : "Frais de consultation technique",
      amount: 1200,
      currency: "MAD",
      dueDate: "2024-03-01",
      paidDate: "2024-02-28",
      status: "paid",
      method: isRTL ? "بطاقة ائتمان" : "Carte de crédit",
      invoice: "INV-2024-004",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            {isRTL ? "مدفوع" : "Payé"}
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            {isRTL ? "في الانتظار" : "En attente"}
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            {isRTL ? "متأخر" : "En retard"}
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const paidAmount = payments.filter((p) => p.status === "paid").reduce((sum, payment) => sum + payment.amount, 0)
  const pendingAmount = payments
    .filter((p) => p.status === "pending" || p.status === "overdue")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const stats = [
    {
      title: isRTL ? "إجمالي المبلغ" : "Montant Total",
      value: `${totalAmount.toLocaleString()} MAD`,
      icon: DollarSign,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: isRTL ? "المبلغ المدفوع" : "Montant Payé",
      value: `${paidAmount.toLocaleString()} MAD`,
      icon: CheckCircle,
      color: "bg-green-100 text-green-800",
    },
    {
      title: isRTL ? "المبلغ المعلق" : "Montant En Attente",
      value: `${pendingAmount.toLocaleString()} MAD`,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: isRTL ? "عدد الفواتير" : "Nombre de Factures",
      value: payments.length.toString(),
      icon: CreditCard,
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
              <BreadcrumbPage>{isRTL ? "المدفوعات" : "Paiements"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isRTL ? "المدفوعات" : "Paiements"}</h1>
            <p className="text-muted-foreground">
              {isRTL ? "إدارة المدفوعات والفواتير" : "Gérez vos paiements et factures"}
            </p>
          </div>
          <Dialog open={isNewPaymentOpen} onOpenChange={setIsNewPaymentOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {isRTL ? "دفعة جديدة" : "Nouveau Paiement"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{isRTL ? "إجراء دفعة جديدة" : "Effectuer un Nouveau Paiement"}</DialogTitle>
                <DialogDescription>
                  {isRTL
                    ? "املأ المعلومات المطلوبة لإجراء دفعة جديدة"
                    : "Remplissez les informations requises pour effectuer un nouveau paiement"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-description">{isRTL ? "وصف الدفعة" : "Description du Paiement"}</Label>
                  <Input
                    id="payment-description"
                    placeholder={isRTL ? "أدخل وصف الدفعة" : "Entrez la description du paiement"}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">{isRTL ? "المبلغ" : "Montant"}</Label>
                    <Input id="amount" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">{isRTL ? "العملة" : "Devise"}</Label>
                    <Select defaultValue="MAD">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MAD">MAD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-method">{isRTL ? "طريقة الدفع" : "Méthode de Paiement"}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? "اختر طريقة الدفع" : "Sélectionnez la méthode"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">{isRTL ? "تحويل بنكي" : "Virement bancaire"}</SelectItem>
                      <SelectItem value="credit_card">{isRTL ? "بطاقة ائتمان" : "Carte de crédit"}</SelectItem>
                      <SelectItem value="check">{isRTL ? "شيك" : "Chèque"}</SelectItem>
                      <SelectItem value="cash">{isRTL ? "نقداً" : "Espèces"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    {isRTL
                      ? "ملاحظة: سيتم توجيهك إلى بوابة الدفع الآمنة لإتمام العملية."
                      : "Note: Vous serez redirigé vers une passerelle de paiement sécurisée pour finaliser la transaction."}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewPaymentOpen(false)}>
                  {isRTL ? "إلغاء" : "Annuler"}
                </Button>
                <Button onClick={() => setIsNewPaymentOpen(false)}>
                  {isRTL ? "متابعة الدفع" : "Procéder au Paiement"}
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

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? "سجل المدفوعات" : "Historique des Paiements"}</CardTitle>
            <CardDescription>
              {isRTL ? "قائمة جميع المدفوعات والفواتير" : "Liste de tous vos paiements et factures"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 rtl:left-auto rtl:right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? "البحث في المدفوعات..." : "Rechercher dans les paiements..."}
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
                  <SelectItem value="paid">{isRTL ? "مدفوع" : "Payé"}</SelectItem>
                  <SelectItem value="pending">{isRTL ? "في الانتظار" : "En attente"}</SelectItem>
                  <SelectItem value="overdue">{isRTL ? "متأخر" : "En retard"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isRTL ? "رقم الدفعة" : "N° Paiement"}</TableHead>
                    <TableHead>{isRTL ? "الوصف" : "Description"}</TableHead>
                    <TableHead>{isRTL ? "المبلغ" : "Montant"}</TableHead>
                    <TableHead>{isRTL ? "تاريخ الاستحقاق" : "Date d'échéance"}</TableHead>
                    <TableHead>{isRTL ? "تاريخ الدفع" : "Date de Paiement"}</TableHead>
                    <TableHead>{isRTL ? "الحالة" : "Statut"}</TableHead>
                    <TableHead className="text-right">{isRTL ? "الإجراءات" : "Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.description}</div>
                          <div className="text-sm text-muted-foreground">{payment.invoice}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {payment.amount.toLocaleString()} {payment.currency}
                      </TableCell>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell>{payment.paidDate || "-"}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {payment.status !== "paid" && (
                            <Button variant="outline" size="sm">
                              {isRTL ? "ادفع الآن" : "Payer"}
                            </Button>
                          )}
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
