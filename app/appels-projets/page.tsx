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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { mockProjectCalls } from "@/mock/data"
import { Search, Filter, MapPin, Calendar, DollarSign, Building2, FileText, Clock, Users, List } from "lucide-react"
import type { ProjectCall } from "@/types"
import { useLanguage } from "@/contexts/language-context"

export default function AppelsProjetsPage() {
  const { t, isRTL } = useLanguage()
  const [projectCalls, setProjectCalls] = useState(mockProjectCalls)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProjectCalls = projectCalls.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter
    const matchesLocation = locationFilter === "all" || project.location === locationFilter

    return matchesSearch && matchesStatus && matchesCategory && matchesLocation
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="default" className="bg-green-500">
            {t("open")}
          </Badge>
        )
      case "closed":
        return <Badge variant="secondary">{t("closed")}</Badge>
      case "awarded":
        return <Badge variant="outline">{t("awarded")}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    return (
      <Badge variant={category === "public" ? "default" : "secondary"}>
        {category === "public" ? t("public") : t("private")}
      </Badge>
    )
  }

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("projectCalls")}</h1>
          <p className="text-lg text-gray-600">{t("discoverProjectOpportunities")}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t("openProjects")}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {projectCalls.filter((p) => p.status === "open").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t("totalBudget")}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(projectCalls.reduce((sum, p) => sum + p.budget, 0) / 1000000).toFixed(0)}M MAD
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t("publicSector")}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {projectCalls.filter((p) => p.category === "public").length}
                  </p>
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
                  <p className="text-sm font-medium text-gray-600">{t("privateSector")}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {projectCalls.filter((p) => p.category === "private").length}
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
                    placeholder={t("searchProject")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allStatuses")}</SelectItem>
                    <SelectItem value="open">{t("open")}</SelectItem>
                    <SelectItem value="closed">{t("closed")}</SelectItem>
                    <SelectItem value="awarded">{t("awarded")}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("category")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allCategories")}</SelectItem>
                    <SelectItem value="public">{t("public")}</SelectItem>
                    <SelectItem value="private">{t("private")}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("location")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allCities")}</SelectItem>
                    <SelectItem value="Oujda">Oujda</SelectItem>
                    <SelectItem value="Nador">Nador</SelectItem>
                    <SelectItem value="Berkane">Berkane</SelectItem>
                    <SelectItem value="Taourirt">Taourirt</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                    setCategoryFilter("all")
                    setLocationFilter("all")
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {t("reset")}
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  size="sm"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  {t("grid")}
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  size="sm"
                >
                  <List className="h-4 w-4 mr-2" />
                  {t("list")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {viewMode === "grid" ? (
          <ProjectCallsGrid projectCalls={filteredProjectCalls} />
        ) : (
          <ProjectCallsList projectCalls={filteredProjectCalls} />
        )}

        {filteredProjectCalls.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t("noProjectsFound")}</h3>
            <p className="text-gray-600">{t("modifySearchCriteria")}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

// Project Calls Grid Component (existing)
function ProjectCallsGrid({ projectCalls }: { projectCalls: ProjectCall[] }) {
  const { t, isRTL } = useLanguage()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="default" className="bg-green-500">
            {t("open")}
          </Badge>
        )
      case "closed":
        return <Badge variant="secondary">{t("closed")}</Badge>
      case "awarded":
        return <Badge variant="outline">{t("awarded")}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    return (
      <Badge variant={category === "public" ? "default" : "secondary"}>
        {category === "public" ? t("public") : t("private")}
      </Badge>
    )
  }

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {projectCalls.map((project) => (
        <Card key={project.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2">
                {getStatusBadge(project.status)}
                {getCategoryBadge(project.category)}
                {isDeadlineNear(project.applicationDeadline) && (
                  <Badge variant="destructive" className="animate-pulse">
                    <Clock className="h-3 w-3 mr-1" />
                    {t("urgent")}
                  </Badge>
                )}
              </div>
            </div>
            <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
            <CardDescription className="text-sm text-gray-600 mb-4">{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span className="font-medium">{t("client")}:</span>
                <span className="ml-1">{project.client}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="font-medium">{t("location")}:</span>
                <span className="ml-1">{project.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                <span className="font-medium">{t("budget")}:</span>
                <span className="ml-1 font-semibold text-green-600">{project.budget.toLocaleString()} MAD</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="h-4 w-4 mr-2" />
                <span className="font-medium">{t("surface")}:</span>
                <span className="ml-1">{project.surface.toLocaleString()} m²</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="font-medium">{t("applicationDeadline")}:</span>
                <span className="ml-1">{project.applicationDeadline}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">{t("mainRequirements")}:</h4>
              <div className="flex flex-wrap gap-1">
                {project.requirements.slice(0, 2).map((req, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {req}
                  </Badge>
                ))}
                {project.requirements.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.requirements.length - 2} {t("others")}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <ProjectDetailsDialog project={project} />
              {project.status === "open" && (
                <Button className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  {t("apply")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Project Calls List Component (New Table View)
function ProjectCallsList({ projectCalls }: { projectCalls: ProjectCall[] }) {
  const { t, isRTL } = useLanguage()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="default" className="bg-green-500">
            {t("open")}
          </Badge>
        )
      case "closed":
        return <Badge variant="secondary">{t("closed")}</Badge>
      case "awarded":
        return <Badge variant="outline">{t("awarded")}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    return (
      <Badge variant={category === "public" ? "default" : "secondary"}>
        {category === "public" ? t("public") : t("private")}
      </Badge>
    )
  }

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("projectCallsList")}</CardTitle>
        <CardDescription>
          {projectCalls.length} {t("project", { count: projectCalls.length })}{" "}
          {t("found", { count: projectCalls.length })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("project")}</TableHead>
                <TableHead>{t("client")}</TableHead>
                <TableHead>{t("location")}</TableHead>
                <TableHead>{t("budget")}</TableHead>
                <TableHead>{t("surface")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("category")}</TableHead>
                <TableHead>{t("deadline")}</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectCalls.map((project) => (
                <TableRow key={project.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{project.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-2 max-w-48">{project.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-sm">{project.client}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-sm font-semibold text-green-600">
                        {project.budget.toLocaleString()} MAD
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-sm">{project.surface.toLocaleString()} m²</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getStatusBadge(project.status)}
                      {isDeadlineNear(project.applicationDeadline) && (
                        <Badge variant="destructive" className="animate-pulse text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {t("urgent")}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryBadge(project.category)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-sm">{project.applicationDeadline}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <ProjectDetailsDialog project={project} />
                      {project.status === "open" && (
                        <Button size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          {t("apply")}
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
  )
}

// Project Details Dialog Component
function ProjectDetailsDialog({ project }: { project: ProjectCall }) {
  const { t, isRTL } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {t("details")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{t("completeProjectDetails")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">{t("description")}</h4>
            <p className="text-gray-600">{project.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">{t("generalInformation")}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("client")}:</span>
                  <span className="font-medium">{project.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("location")}:</span>
                  <span className="font-medium">{project.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("surface")}:</span>
                  <span className="font-medium">{project.surface.toLocaleString()} m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("budget")}:</span>
                  <span className="font-medium text-green-600">{project.budget.toLocaleString()} MAD</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">{t("calendar")}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("publication")}:</span>
                  <span className="font-medium">{project.publishDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("applicationDeadline")}:</span>
                  <span className="font-medium">{project.applicationDeadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("projectDeadline")}:</span>
                  <span className="font-medium">{project.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("status")}:</span>
                  <span className="font-medium">
                    {project.status === "open" ? t("open") : project.status === "closed" ? t("closed") : t("awarded")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">{t("requirementsAndQualifications")}</h4>
            <ul className="space-y-1">
              {project.requirements.map((req, index) => (
                <li key={index} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {project.status === "open" && (
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">{t("applyToThisProject")}</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="cover-letter">{t("coverLetter")}</Label>
                  <Textarea id="cover-letter" placeholder={t("describeYourApproach")} rows={4} />
                </div>
                <div>
                  <Label htmlFor="portfolio">{t("portfolioURLOrFile")}</Label>
                  <Input id="portfolio" placeholder={t("portfolioPlaceholder")} />
                </div>
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  {t("submitMyApplication")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
