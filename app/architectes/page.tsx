"use client"

import { useState, useEffect } from "react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockArchitects } from "@/mock/data"
import { Search, Filter, MapPin, Phone, Mail, Building2, Star, Navigation, Map, List } from "lucide-react"
import Image from "next/image"
import type { Architect } from "@/types"

// Mock coordinates for cities in the Oriental region
const cityCoordinates = {
  Oujda: { lat: 34.6814, lng: -1.9086 },
  Nador: { lat: 35.1681, lng: -2.9335 },
  Berkane: { lat: 34.9218, lng: -2.32 },
  Taourirt: { lat: 34.4078, lng: -2.8953 },
  Jerada: { lat: 34.3108, lng: -2.1625 },
}

export default function ArchitectesPage() {
  const [architects, setArchitects] = useState(mockArchitects)
  const [searchTerm, setSearchTerm] = useState("")
  const [cityFilter, setCityFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "map" | "list">("grid")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Geolocation error:", error)
          // Default to Oujda if geolocation fails
          setUserLocation(cityCoordinates["Oujda"])
        },
      )
    } else {
      setUserLocation(cityCoordinates["Oujda"])
    }
  }, [])

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Get architect distance from user
  const getArchitectDistance = (architect: Architect) => {
    if (!userLocation) return 0
    const cityCoords = cityCoordinates[architect.city as keyof typeof cityCoordinates]
    if (!cityCoords) return 0
    return calculateDistance(userLocation.lat, userLocation.lng, cityCoords.lat, cityCoords.lng)
  }

  // Get all unique specialties
  const allSpecialties = Array.from(new Set(architects.flatMap((architect) => architect.specialties)))

  const filteredAndSortedArchitects = architects
    .filter((architect) => {
      const matchesSearch =
        architect.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        architect.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        architect.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCity = cityFilter === "all" || architect.city === cityFilter
      const matchesSpecialty =
        specialtyFilter === "all" || architect.specialties.some((s) => s.includes(specialtyFilter))

      return matchesSearch && matchesCity && matchesSpecialty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
        case "city":
          return a.city.localeCompare(b.city)
        case "projects":
          return b.projects - a.projects
        case "distance":
          return getArchitectDistance(a) - getArchitectDistance(b)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Bottin des Architectes</h1>
          <p className="text-lg text-gray-600">
            Trouvez l'architecte qui correspond à vos besoins dans la région orientale
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total architectes</p>
                  <p className="text-2xl font-bold text-gray-900">{architects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Architectes actifs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {architects.filter((a) => a.status === "active").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Villes couvertes</p>
                  <p className="text-2xl font-bold text-gray-900">{new Set(architects.map((a) => a.city)).size}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Projets réalisés</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {architects.reduce((sum, a) => sum + a.projects, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and View Toggle */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un architecte..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    <SelectItem value="Oujda">Oujda</SelectItem>
                    <SelectItem value="Nador">Nador</SelectItem>
                    <SelectItem value="Berkane">Berkane</SelectItem>
                    <SelectItem value="Taourirt">Taourirt</SelectItem>
                    <SelectItem value="Jerada">Jerada</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes spécialités</SelectItem>
                    {allSpecialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nom</SelectItem>
                    <SelectItem value="city">Ville</SelectItem>
                    <SelectItem value="projects">Projets</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setCityFilter("all")
                    setSpecialtyFilter("all")
                    setSortBy("name")
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Réinitialiser
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  size="sm"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Grille
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  size="sm"
                >
                  <List className="h-4 w-4 mr-2" />
                  Liste
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  onClick={() => setViewMode("map")}
                  size="sm"
                >
                  <Map className="h-4 w-4 mr-2" />
                  Carte
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {viewMode === "grid" ? (
          <ArchitectsGrid architects={filteredAndSortedArchitects} userLocation={userLocation} />
        ) : viewMode === "list" ? (
          <ArchitectsList architects={filteredAndSortedArchitects} userLocation={userLocation} />
        ) : (
          <ArchitectsMap architects={filteredAndSortedArchitects} userLocation={userLocation} />
        )}

        {filteredAndSortedArchitects.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun architecte trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

// Architects Grid Component
function ArchitectsGrid({
  architects,
  userLocation,
}: {
  architects: Architect[]
  userLocation: { lat: number; lng: number } | null
}) {
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const getArchitectDistance = (architect: Architect) => {
    if (!userLocation) return null
    const cityCoords = cityCoordinates[architect.city as keyof typeof cityCoordinates]
    if (!cityCoords) return null
    return calculateDistance(userLocation.lat, userLocation.lng, cityCoords.lat, cityCoords.lng)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {architects.map((architect) => {
        const distance = getArchitectDistance(architect)
        return (
          <Card key={architect.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <Image
                  src={architect.photo || "/placeholder.svg"}
                  alt={`${architect.firstName} ${architect.lastName}`}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <CardTitle className="text-lg">
                {architect.firstName} {architect.lastName}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <MapPin className="h-4 w-4" />
                {architect.city}
                {distance && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {distance.toFixed(1)} km
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{architect.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="truncate">{architect.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span>{architect.projects} projets</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-gray-700">Spécialités:</p>
                <div className="flex flex-wrap gap-1">
                  {architect.specialties.slice(0, 2).map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {architect.specialties.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{architect.specialties.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <Badge variant={architect.status === "active" ? "default" : "secondary"}>
                  {architect.status === "active" ? "Actif" : "Inactif"}
                </Badge>
                <span className="text-xs text-gray-500">{architect.registrationNumber}</span>
              </div>

              <div className="flex gap-2">
                <ArchitectDetailsDialog architect={architect} />
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Contacter
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Architects List Component (New Table View)
function ArchitectsList({
  architects,
  userLocation,
}: {
  architects: Architect[]
  userLocation: { lat: number; lng: number } | null
}) {
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const getArchitectDistance = (architect: Architect) => {
    if (!userLocation) return null
    const cityCoords = cityCoordinates[architect.city as keyof typeof cityCoordinates]
    if (!cityCoords) return null
    return calculateDistance(userLocation.lat, userLocation.lng, cityCoords.lat, cityCoords.lng)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des Architectes</CardTitle>
        <CardDescription>
          {architects.length} architecte{architects.length > 1 ? "s" : ""} trouvé{architects.length > 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16"></TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Spécialités</TableHead>
                <TableHead>Projets</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Statut</TableHead>
                {userLocation && <TableHead>Distance</TableHead>}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {architects.map((architect) => {
                const distance = getArchitectDistance(architect)
                return (
                  <TableRow key={architect.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="w-10 h-10 relative">
                        <Image
                          src={architect.photo || "/placeholder.svg"}
                          alt={`${architect.firstName} ${architect.lastName}`}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {architect.firstName} {architect.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{architect.registrationNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {architect.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {architect.specialties.slice(0, 2).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {architect.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{architect.specialties.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-1 text-gray-400" />
                        {architect.projects}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          <span className="truncate">{architect.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          <span className="truncate max-w-32">{architect.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={architect.status === "active" ? "default" : "secondary"}>
                        {architect.status === "active" ? "Actif" : "Inactif"}
                      </Badge>
                    </TableCell>
                    {userLocation && (
                      <TableCell>
                        {distance && (
                          <div className="flex items-center text-sm">
                            <Navigation className="h-3 w-3 mr-1 text-blue-500" />
                            <span className="text-blue-600 font-medium">{distance.toFixed(1)} km</span>
                          </div>
                        )}
                      </TableCell>
                    )}
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <ArchitectDetailsDialog architect={architect} />
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// Architects Map Component with Enhanced Geolocation
function ArchitectsMap({
  architects,
  userLocation,
}: {
  architects: Architect[]
  userLocation: { lat: number; lng: number } | null
}) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 34.6814, lng: -1.9086 }) // Default to Oujda

  // Update map center when user location changes
  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation)
    }
  }, [userLocation])

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  return (
    <div className="space-y-6">
      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Carte Interactive des Architectes</CardTitle>
              <CardDescription>Cliquez sur les marqueurs pour voir les architectes de chaque ville</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (userLocation) {
                    setMapCenter(userLocation)
                  }
                }}
              >
                <Navigation className="h-4 w-4 mr-2" />
                Ma position
              </Button>
              <Button variant="outline" size="sm" onClick={() => setMapCenter({ lat: 34.6814, lng: -1.9086 })}>
                Centrer sur Oujda
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 rounded-lg relative overflow-hidden border-2 border-gray-200">
            {/* Map Grid Lines */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(10)].map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute w-full border-t border-gray-300"
                  style={{ top: `${i * 10}%` }}
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute h-full border-l border-gray-300"
                  style={{ left: `${i * 10}%` }}
                />
              ))}
            </div>

            {/* Compass */}
            <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-3 bg-red-500 rounded-t-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center rotate-180">
                  <div className="w-1 h-3 bg-gray-400 rounded-t-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-red-500">
                  N
                </div>
              </div>
            </div>

            {/* Scale */}
            <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded shadow-md text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-1 bg-black"></div>
                <span>50 km</span>
              </div>
            </div>

            {/* User Location Marker */}
            {userLocation && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  left: `${((userLocation.lng + 3) / 2) * 100}%`,
                  top: `${100 - ((userLocation.lat - 34) / 2) * 100}%`,
                }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                    Vous êtes ici
                  </div>
                </div>
              </div>
            )}

            {/* City Markers */}
            {Object.entries(cityCoordinates).map(([city, coords]) => {
              const cityArchitects = architects.filter((a) => a.city === city)
              if (cityArchitects.length === 0) return null

              const x = ((coords.lng + 3) / 2) * 100
              const y = 100 - ((coords.lat - 34) / 2) * 100
              const distance = userLocation
                ? calculateDistance(userLocation.lat, userLocation.lng, coords.lat, coords.lng)
                : 0

              return (
                <div
                  key={city}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{
                    left: `${Math.max(5, Math.min(95, x))}%`,
                    top: `${Math.max(5, Math.min(95, y))}%`,
                  }}
                >
                  <div className="relative">
                    <button
                      onClick={() => setSelectedCity(selectedCity === city ? null : city)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg transition-all hover:scale-110 ${
                        selectedCity === city ? "bg-red-600 ring-4 ring-red-200" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {cityArchitects.length}
                    </button>

                    {/* City Info Popup */}
                    <div
                      className={`absolute top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-48 transition-all ${
                        selectedCity === city ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                    >
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900">{city}</h4>
                        <p className="text-sm text-gray-600">
                          {cityArchitects.length} architecte{cityArchitects.length > 1 ? "s" : ""}
                        </p>
                        {userLocation && (
                          <p className="text-xs text-blue-600 mt-1">
                            <Navigation className="h-3 w-3 inline mr-1" />
                            {distance.toFixed(1)} km
                          </p>
                        )}
                        <div className="mt-2 space-y-1">
                          {cityArchitects.slice(0, 3).map((architect) => (
                            <div key={architect.id} className="text-xs text-gray-700 flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              {architect.firstName} {architect.lastName}
                            </div>
                          ))}
                          {cityArchitects.length > 3 && (
                            <p className="text-xs text-gray-500">+{cityArchitects.length - 3} autres</p>
                          )}
                        </div>
                      </div>
                      {/* Arrow pointing to marker */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3 text-xs">
              <h4 className="font-semibold mb-2">Légende</h4>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  <span>Architectes par ville</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Votre position</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                  <span>Ville sélectionnée</span>
                </div>
              </div>
            </div>

            {/* Distance Circles (if user location available) */}
            {userLocation && (
              <>
                {[25, 50, 100].map((radius, index) => {
                  const radiusInPixels = (radius / 50) * 60 // Approximate conversion
                  return (
                    <div
                      key={radius}
                      className="absolute border border-green-300 rounded-full opacity-30"
                      style={{
                        left: `${((userLocation.lng + 3) / 2) * 100}%`,
                        top: `${100 - ((userLocation.lat - 34) / 2) * 100}%`,
                        width: `${radiusInPixels * 2}px`,
                        height: `${radiusInPixels * 2}px`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-green-600 font-medium">
                        {radius}km
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </div>

          {/* Map Controls */}
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>Total: {architects.length} architectes</span>
              <span>•</span>
              <span>{Object.keys(cityCoordinates).length} villes</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Cliquez sur les marqueurs pour plus d'infos</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Architects by Distance (if user location available) */}
      {userLocation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Navigation className="h-5 w-5 mr-2" />
              Architectes par distance
            </CardTitle>
            <CardDescription>Triés par proximité de votre position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {architects
                .map((architect) => ({
                  ...architect,
                  distance: calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    cityCoordinates[architect.city as keyof typeof cityCoordinates]?.lat || 0,
                    cityCoordinates[architect.city as keyof typeof cityCoordinates]?.lng || 0,
                  ),
                }))
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 5)
                .map((architect) => (
                  <div
                    key={architect.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 relative">
                        <Image
                          src={architect.photo || "/placeholder.svg"}
                          alt={`${architect.firstName} ${architect.lastName}`}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">
                          {architect.firstName} {architect.lastName}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {architect.city} • {architect.specialties[0]}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">{architect.distance.toFixed(1)} km</p>
                      <p className="text-xs text-gray-500">{architect.projects} projets</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Architects by City Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(
          architects.reduce(
            (acc, architect) => {
              if (!acc[architect.city]) acc[architect.city] = []
              acc[architect.city].push(architect)
              return acc
            },
            {} as Record<string, Architect[]>,
          ),
        ).map(([city, cityArchitects]) => {
          const cityCoords = cityCoordinates[city as keyof typeof cityCoordinates]
          const distance =
            userLocation && cityCoords
              ? calculateDistance(userLocation.lat, userLocation.lng, cityCoords.lat, cityCoords.lng)
              : null

          return (
            <Card key={city} className={selectedCity === city ? "ring-2 ring-blue-500" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {city}
                    <Badge variant="secondary" className="ml-2">
                      {cityArchitects.length} architecte{cityArchitects.length > 1 ? "s" : ""}
                    </Badge>
                  </div>
                  {distance && (
                    <div className="text-sm text-blue-600 flex items-center">
                      <Navigation className="h-4 w-4 mr-1" />
                      {distance.toFixed(1)} km
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cityArchitects.slice(0, 4).map((architect) => (
                    <div
                      key={architect.id}
                      className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="w-10 h-10 relative">
                        <Image
                          src={architect.photo || "/placeholder.svg"}
                          alt={`${architect.firstName} ${architect.lastName}`}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {architect.firstName} {architect.lastName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {architect.specialties[0]} • {architect.projects} projets
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Badge variant={architect.status === "active" ? "default" : "secondary"} className="text-xs">
                          {architect.status === "active" ? "Actif" : "Inactif"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {cityArchitects.length > 4 && (
                    <p className="text-center text-sm text-gray-500 pt-2 border-t">
                      +{cityArchitects.length - 4} autre{cityArchitects.length - 4 > 1 ? "s" : ""} architecte
                      {cityArchitects.length - 4 > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// Architect Details Dialog Component
function ArchitectDetailsDialog({ architect }: { architect: Architect }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Détails
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {architect.firstName} {architect.lastName}
          </DialogTitle>
          <DialogDescription>Profil détaillé de l'architecte</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 relative">
              <Image
                src={architect.photo || "/placeholder.svg"}
                alt={`${architect.firstName} ${architect.lastName}`}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {architect.firstName} {architect.lastName}
              </h3>
              <p className="text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {architect.city}
              </p>
              <Badge variant={architect.status === "active" ? "default" : "secondary"} className="mt-1">
                {architect.status === "active" ? "Actif" : "Inactif"}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Informations de contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{architect.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{architect.email}</span>
                </div>
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{architect.registrationNumber}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Statistiques</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Projets réalisés:</span>
                  <span className="font-medium">{architect.projects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Membre depuis:</span>
                  <span className="font-medium">{architect.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut:</span>
                  <span className="font-medium">{architect.status === "active" ? "Actif" : "Inactif"}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Spécialités</h4>
            <div className="flex flex-wrap gap-2">
              {architect.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex gap-3">
              <Button className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Envoyer un message
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                Appeler
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
