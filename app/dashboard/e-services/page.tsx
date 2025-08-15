"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  CreditCard,
  Upload,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Mail,
  MapPin,
  Paperclip,
} from "lucide-react"

export default function EServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Tableau de bord</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Services en ligne</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <EServicesContent />
      </div>
    </div>
  )
}

// E-Services Content Component
function EServicesContent() {
  const [activeService, setActiveService] = useState<string | null>(null)

  const services = [
    {
      id: "payment",
      title: "Paiement en ligne",
      description: "Paiement des cotisations en ligne en toute sécurité",
      icon: CreditCard,
      color: "bg-green-500",
      status: "available",
    },
    {
      id: "project",
      title: "Dépôt de projet",
      description: "Dépôt de fiche de projet pour visa de contrat d'architecte",
      icon: Upload,
      color: "bg-blue-500",
      status: "available",
    },
    {
      id: "certificate",
      title: "Demande d'attestation",
      description: "Attestation d'inscription, pour concours et consultation architecturale",
      icon: FileText,
      color: "bg-purple-500",
      status: "available",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Services en ligne</h2>
          <p className="text-gray-600">Accédez à tous vos services administratifs en ligne</p>
        </div>
        <Badge variant="default" className="bg-green-500">
          <Shield className="h-3 w-3 mr-1" />
          Sécurisé
        </Badge>
      </div>

      {/* Services Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Card key={service.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <Badge variant="default" className="mt-1">
                      Disponible
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{service.description}</CardDescription>
                <Button
                  className="w-full"
                  onClick={() => setActiveService(service.id)}
                  variant={activeService === service.id ? "default" : "outline"}
                >
                  {activeService === service.id ? "Service actif" : "Accéder au service"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Service Content */}
      {activeService && (
        <Card>
          <CardContent className="p-6">
            {activeService === "payment" && <OnlinePaymentService />}
            {activeService === "project" && <ProjectSubmissionService />}
            {activeService === "certificate" && <CertificateRequestService />}
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>Vos dernières demandes et transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                type: "payment",
                title: "Paiement cotisation annuelle 2024",
                status: "completed",
                date: "2024-01-15",
                amount: "1,200 MAD",
              },
              {
                id: 2,
                type: "certificate",
                title: "Attestation d'inscription",
                status: "processing",
                date: "2024-01-20",
                amount: null,
              },
              {
                id: 3,
                type: "project",
                title: "Dépôt projet Villa Moderne",
                status: "pending",
                date: "2024-01-18",
                amount: null,
              },
            ].map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.type === "payment"
                        ? "bg-green-100"
                        : activity.type === "certificate"
                          ? "bg-purple-100"
                          : "bg-blue-100"
                    }`}
                  >
                    {activity.type === "payment" && <CreditCard className="h-5 w-5 text-green-600" />}
                    {activity.type === "certificate" && <FileText className="h-5 w-5 text-purple-600" />}
                    {activity.type === "project" && <Upload className="h-5 w-5 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {activity.amount && <span className="font-semibold text-green-600">{activity.amount}</span>}
                  <Badge
                    variant={
                      activity.status === "completed"
                        ? "default"
                        : activity.status === "processing"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {activity.status === "completed"
                      ? "Terminé"
                      : activity.status === "processing"
                        ? "En cours"
                        : "En attente"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Online Payment Service Component
function OnlinePaymentService() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)

  const payments = [
    {
      id: "annual",
      title: "Cotisation annuelle 2024",
      amount: 1200,
      dueDate: "2024-12-31",
      status: "pending",
      description: "Cotisation obligatoire pour l'année 2024",
    },
    {
      id: "solidarity",
      title: "Caisse de solidarité",
      amount: 500,
      dueDate: "2024-06-30",
      status: "paid",
      description: "Contribution au fonds de solidarité",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
          <CreditCard className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Paiement en ligne</h3>
          <p className="text-gray-600">Paiement sécurisé de vos cotisations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {payments.map((payment) => (
          <Card key={payment.id} className={payment.status === "pending" ? "border-orange-200" : "border-green-200"}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{payment.title}</CardTitle>
                  <CardDescription>{payment.description}</CardDescription>
                </div>
                <Badge variant={payment.status === "paid" ? "default" : "destructive"}>
                  {payment.status === "paid" ? "Payé" : "En attente"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Montant:</span>
                  <span className="font-semibold text-lg">{payment.amount.toLocaleString()} MAD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Échéance:</span>
                  <span className="text-sm">{payment.dueDate}</span>
                </div>
                {payment.status === "pending" ? (
                  <PaymentDialog payment={payment} />
                ) : (
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger reçu
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sécurité des paiements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium">Cryptage SSL</p>
                <p className="text-sm text-gray-600">Données sécurisées</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-medium">Paiement instantané</p>
                <p className="text-sm text-gray-600">Confirmation immédiate</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-purple-500" />
              <div>
                <p className="font-medium">Reçu automatique</p>
                <p className="text-sm text-gray-600">Envoi par email</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Project Submission Service Component
function ProjectSubmissionService() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    client: "",
    description: "",
    files: [] as File[],
  })

  const projectTypes = [
    "Construction résidentielle",
    "Construction commerciale",
    "Construction industrielle",
    "Rénovation",
    "Lotissement",
    "Aménagement urbain",
  ]

  const requiredDocuments = [
    "Plans architecturaux (PDF/DWG)",
    "Cahier des charges technique",
    "Étude de site",
    "Devis estimatif",
    "Autorisation de construire",
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, files: Array.from(e.target.files) })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Project submitted:", formData)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
          <Upload className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Dépôt de projet</h3>
          <p className="text-gray-600">Soumission de fiche de projet pour visa de contrat</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations du projet</CardTitle>
              <CardDescription>Remplissez les détails de votre projet</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="project-title">Titre du projet</Label>
                  <Input
                    id="project-title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Villa moderne - Oujda"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project-type">Type de projet</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="project-location">Localisation</Label>
                    <Input
                      id="project-location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ville, quartier"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="client-name">Nom du client</Label>
                  <Input
                    id="client-name"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Nom du maître d'ouvrage"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="project-description">Description du projet</Label>
                  <Textarea
                    id="project-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description détaillée du projet..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="project-files">Documents du projet</Label>
                  <Input
                    id="project-files"
                    type="file"
                    multiple
                    accept=".pdf,.dwg,.jpg,.png,.doc,.docx"
                    onChange={handleFileChange}
                    className="mt-2"
                  />
                  {formData.files.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">{formData.files.length} fichier(s) sélectionné(s)</p>
                      <div className="space-y-1 mt-2">
                        {formData.files.map((file, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <Paperclip className="h-4 w-4" />
                            <span>{file.name}</span>
                            <span className="text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Soumettre le projet
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Documents requis</CardTitle>
              <CardDescription>Liste des documents nécessaires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Délais de traitement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Accusé de réception: Immédiat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Examen du dossier: 5-10 jours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Délivrance du visa: 2-3 jours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Certificate Request Service Component
function CertificateRequestService() {
  const [formData, setFormData] = useState({
    type: "",
    reason: "",
    urgent: false,
    delivery: "",
  })

  const certificateTypes = [
    { value: "registration", label: "Attestation d'inscription", price: 50 },
    { value: "competition", label: "Attestation pour concours", price: 100 },
    { value: "consultation", label: "Attestation pour consultation", price: 75 },
  ]

  const deliveryMethods = [
    { value: "pickup", label: "Retrait au bureau", price: 0 },
    { value: "email", label: "Envoi par email", price: 0 },
    { value: "postal", label: "Envoi postal", price: 25 },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Certificate request submitted:", formData)
  }

  const selectedCertificate = certificateTypes.find((cert) => cert.value === formData.type)
  const selectedDelivery = deliveryMethods.find((delivery) => delivery.value === formData.delivery)
  const totalPrice = (selectedCertificate?.price || 0) + (selectedDelivery?.price || 0) + (formData.urgent ? 50 : 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Demande d'attestation</h3>
          <p className="text-gray-600">Demande de certificats et attestations officielles</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Détails de la demande</CardTitle>
              <CardDescription>Sélectionnez le type d'attestation souhaité</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="certificate-type">Type d'attestation</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type d'attestation" />
                    </SelectTrigger>
                    <SelectContent>
                      {certificateTypes.map((cert) => (
                        <SelectItem key={cert.value} value={cert.value}>
                          <div className="flex justify-between items-center w-full">
                            <span>{cert.label}</span>
                            <span className="ml-4 text-green-600 font-semibold">{cert.price} MAD</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="request-reason">Motif de la demande</Label>
                  <Textarea
                    id="request-reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Précisez l'utilisation prévue de l'attestation..."
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="delivery-method">Mode de livraison</Label>
                  <Select
                    value={formData.delivery}
                    onValueChange={(value) => setFormData({ ...formData, delivery: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir le mode de livraison" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryMethods.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          <div className="flex justify-between items-center w-full">
                            <span>{method.label}</span>
                            {method.price > 0 && (
                              <span className="ml-4 text-blue-600 font-semibold">+{method.price} MAD</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="urgent-request"
                    checked={formData.urgent}
                    onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="urgent-request" className="flex items-center space-x-2">
                    <span>Demande urgente (24-48h)</span>
                    <Badge variant="destructive">+50 MAD</Badge>
                  </Label>
                </div>

                <Separator />

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Attestation:</span>
                    <span>{selectedCertificate?.price || 0} MAD</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Livraison:</span>
                    <span>{selectedDelivery?.price || 0} MAD</span>
                  </div>
                  {formData.urgent && (
                    <div className="flex justify-between items-center mb-2">
                      <span>Traitement urgent:</span>
                      <span>50 MAD</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total:</span>
                    <span className="text-green-600">{totalPrice} MAD</span>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={!formData.type || !formData.delivery}>
                  <FileText className="h-4 w-4 mr-2" />
                  Soumettre la demande ({totalPrice} MAD)
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Délais de livraison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Standard</p>
                    <p className="text-xs text-gray-600">5-7 jours ouvrables</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Express</p>
                    <p className="text-xs text-gray-600">24-48 heures</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Modes de livraison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Retrait au bureau</p>
                    <p className="text-xs text-gray-600">Gratuit</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Email (PDF)</p>
                    <p className="text-xs text-gray-600">Gratuit</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Courrier postal</p>
                    <p className="text-xs text-gray-600">25 MAD</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Payment Dialog Component
function PaymentDialog({ payment }: { payment: any }) {
  const [open, setOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [processing, setProcessing] = useState(false)

  const handlePayment = async () => {
    setProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setProcessing(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <CreditCard className="h-4 w-4 mr-2" />
          Payer maintenant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Paiement sécurisé</DialogTitle>
          <DialogDescription>
            {payment.title} - {payment.amount.toLocaleString()} MAD
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Méthode de paiement</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Carte bancaire</SelectItem>
                <SelectItem value="bank">Virement bancaire</SelectItem>
                <SelectItem value="mobile">Paiement mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-3">
              <div>
                <Label>Numéro de carte</Label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Date d'expiration</Label>
                  <Input placeholder="MM/AA" />
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input placeholder="123" />
                </div>
              </div>
            </div>
          )}

          <div className="bg-green-50 p-3 rounded-lg flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-800">Paiement sécurisé par cryptage SSL</span>
          </div>

          <Button onClick={handlePayment} disabled={processing} className="w-full">
            {processing ? "Traitement en cours..." : `Payer ${payment.amount.toLocaleString()} MAD`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
