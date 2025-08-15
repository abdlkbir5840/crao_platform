export interface Architect {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  photo: string
  specialties: string[]
  registrationNumber: string
  status: "active" | "suspended" | "pending"
  joinDate: string
  projects: number
}

export interface Contract {
  id: string
  architectId: string
  type: "construction" | "lotissement" | "renovation"
  title: string
  client: string
  status: "draft" | "pending" | "approved" | "rejected"
  amount: number
  startDate: string
  endDate: string
  documents: Document[]
  signatureStatus: "unsigned" | "signed" | "validated"
}

export interface Agency {
  id: string
  name: string
  address: string
  city: string
  phone: string
  email: string
  status: "active" | "pending" | "suspended"
  documents: Document[]
  architects: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  type: string
  status: "planning" | "in-progress" | "completed"
  architectId: string
  startDate: string
  budget: number
  location: string
}

export interface TFRecord {
  id: string
  titleNumber: string
  owner: string
  location: string
  surface: number
  status: "available" | "locked" | "processing"
  lastUpdate: string
}

export interface Survey {
  id: string
  title: string
  description: string
  questions: SurveyQuestion[]
  responses: number
  startDate: string
  endDate: string
  status: "active" | "closed"
}

export interface SurveyQuestion {
  id: string
  question: string
  type: "multiple" | "single" | "text"
  options?: string[]
  responses: { [key: string]: number }
}

export interface Document {
  id: string
  title: string
  type: "pdf" | "doc" | "image"
  url: string
  uploadDate: string
  category: string
  size: string
}

export interface Request {
  id: string
  type: "complaint" | "attestation" | "appointment" | "general"
  title: string
  description: string
  status: "pending" | "processing" | "resolved" | "rejected"
  submittedBy: string
  submittedDate: string
  priority: "low" | "medium" | "high"
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  read: boolean
  date: string
  userId: string
}

export interface News {
  id: string
  title: string
  description: string
  content: string
  image: string
  publishDate: string
  category: string
  author: string
}

export interface Payment {
  id: string
  architectId: string
  type: "cotisation" | "solidarite" | "visa" | "other"
  amount: number
  status: "pending" | "completed" | "failed"
  date: string
  reference: string
}

export interface Language {
  code: "fr" | "ar"
  name: string
  direction: "ltr" | "rtl"
}

export interface ProjectCall {
  id: string
  title: string
  description: string
  client: string
  budget: number
  deadline: string
  location: string
  requirements: string[]
  status: "open" | "closed" | "awarded"
  publishDate: string
  applicationDeadline: string
  category: "public" | "private"
  surface: number
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  address: string
  organizer: string
  category: "conference" | "formation" | "meeting" | "visit"
  capacity: number
  registeredCount: number
  price: number
  status: "upcoming" | "completed" | "cancelled"
  image: string
}
