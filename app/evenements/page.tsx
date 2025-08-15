"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { mockEvents } from "@/mock/data"
import { Search, Filter, Calendar, MapPin, Clock, Users, DollarSign, UserPlus } from "lucide-react"
import Image from "next/image"
import type { Event } from "@/types"

export default function EvenementsPage() {
  const [events, setEvents] = useState(mockEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter
    const matchesStatus = statusFilter === "all" || event.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="default" className="bg-blue-500">
            À venir
          </Badge>
        )
      case "completed":
        return <Badge variant="secondary">Terminé</Badge>
      case "cancelled":
        return <Badge variant="destructive">Annulé</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const categoryMap = {
      conference: { label: "Conférence", color: "bg-purple-500" },
      formation: { label: "Formation", color: "bg-green-500" },
      meeting: { label: "Assemblée", color: "bg-blue-500" },
      visit: { label: "Visite", color: "bg-orange-500" },
    }
    const cat = categoryMap[category as keyof typeof categoryMap] || { label: category, color: "bg-gray-500" }
    return (
      <Badge variant="default" className={cat.color}>
        {cat.label}
      </Badge>
    )
  }

  const isEventSoon = (date: string) => {
    const eventDate = new Date(date)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays > 0
  }

  const getAvailableSpots = (event: Event) => {
    return event.capacity - event.registeredCount
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Événements</h1>
          <p className="text-lg text-gray-600">
            Participez aux événements organisés par le CRAO et enrichissez vos connaissances
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">À venir</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {events.filter((e) => e.status === "upcoming").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Participants</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {events.reduce((sum, e) => sum + e.registeredCount, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserPlus className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Places disponibles</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {events.filter((e) => e.status === "upcoming").reduce((sum, e) => sum + getAvailableSpots(e), 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cette semaine</p>
                  <p className="text-2xl font-bold text-gray-900">{events.filter((e) => isEventSoon(e.date)).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un événement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="conference">Conférence</SelectItem>
                  <SelectItem value="formation">Formation</SelectItem>
                  <SelectItem value="meeting">Assemblée</SelectItem>
                  <SelectItem value="visit">Visite</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="upcoming">À venir</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                  setStatusFilter("all")
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video relative">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {getCategoryBadge(event.category)}
                  {getStatusBadge(event.status)}
                  {isEventSoon(event.date) && event.status === "upcoming" && (
                    <Badge variant="destructive" className="animate-pulse">
                      Bientôt
                    </Badge>
                  )}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">{event.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="font-medium">{event.date}</span>
                    <Clock className="h-4 w-4 ml-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      {event.registeredCount}/{event.capacity} participants
                    </span>
                    {getAvailableSpots(event) <= 5 && event.status === "upcoming" && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        Places limitées
                      </Badge>
                    )}
                  </div>
                  {event.price > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="font-semibold text-green-600">{event.price} MAD</span>
                    </div>
                  )}
                  {event.price === 0 && (
                    <div className="flex items-center text-sm text-green-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="font-semibold">Gratuit</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <EventDetailsDialog event={event} />
                  {event.status === "upcoming" && getAvailableSpots(event) > 0 && (
                    <Button className="flex-1">
                      <UserPlus className="h-4 w-4 mr-2" />
                      S'inscrire
                    </Button>
                  )}
                  {event.status === "upcoming" && getAvailableSpots(event) === 0 && (
                    <Button disabled className="flex-1">
                      Complet
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun événement trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

// Event Details Dialog Component
function EventDetailsDialog({ event }: { event: Event }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Détails</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>Détails complets de l'événement</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          </div>

          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-600">{event.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Informations pratiques</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">Date:</span>
                  <span className="ml-2">{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">Heure:</span>
                  <span className="ml-2">{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">Lieu:</span>
                  <span className="ml-2">{event.location}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                  <span className="font-medium">Adresse:</span>
                  <span className="ml-2">{event.address}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Participation</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">Capacité:</span>
                  <span className="ml-2">{event.capacity} personnes</span>
                </div>
                <div className="flex items-center">
                  <UserPlus className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">Inscrits:</span>
                  <span className="ml-2">{event.registeredCount} personnes</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">Places restantes:</span>
                  <span className="ml-2 font-semibold text-green-600">
                    {event.capacity - event.registeredCount} places
                  </span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">Prix:</span>
                  <span className={`ml-2 font-semibold ${event.price === 0 ? "text-green-600" : "text-blue-600"}`}>
                    {event.price === 0 ? "Gratuit" : `${event.price} MAD`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Organisateur</h4>
            <p className="text-gray-600">{event.organizer}</p>
          </div>

          {event.status === "upcoming" && event.capacity - event.registeredCount > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">S'inscrire à cet événement</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="participant-name">Nom complet</Label>
                  <Input id="participant-name" placeholder="Votre nom complet" />
                </div>
                <div>
                  <Label htmlFor="participant-email">Email</Label>
                  <Input id="participant-email" type="email" placeholder="votre@email.com" />
                </div>
                <div>
                  <Label htmlFor="participant-phone">Téléphone</Label>
                  <Input id="participant-phone" placeholder="+212 6 XX XX XX XX" />
                </div>
                <Button className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Confirmer l'inscription
                  {event.price > 0 && <span className="ml-2">({event.price} MAD)</span>}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
