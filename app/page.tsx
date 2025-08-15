"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { mockNews, mockDocuments } from "@/mock/data"
import { Building2, Users, FileText, MapPin, Phone, Mail, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function HomePage() {
  const { t, isRTL } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {isRTL ? "المجلس الجهوي للمهندسين المعماريين" : "Conseil Régional des Architectes"}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                {isRTL ? "الجهة الشرقية - المغرب" : "Zone Orientale - Maroc"}
              </p>
              <p className="text-lg max-w-3xl mx-auto mb-8 text-blue-50">
                {isRTL
                  ? "المجلس الجهوي للمهندسين المعماريين هو الهيئة التمثيلية للمهندسين المعماريين في الجهة الشرقية للمغرب، يعمل على تعزيز الهندسة المعمارية ومرافقة المهنيين."
                  : "Le CRAO est l'organisme représentatif des architectes de la région orientale du Maroc, œuvrant pour la promotion de l'architecture et l'accompagnement des professionnels."}
              </p>

              {/* Notre Mission Section */}
              <div className="max-w-4xl mx-auto mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <h2 className="text-2xl font-bold mb-4 text-white">{isRTL ? "مهمتنا" : "Notre Mission"}</h2>
                <p className="text-blue-50 leading-relaxed">
                  {isRTL
                    ? "نهدف إلى تطوير مهنة الهندسة المعمارية وضمان جودة الممارسة المهنية في الجهة الشرقية، من خلال التكوين المستمر والمرافقة التقنية والإدارية للمهندسين المعماريين."
                    : "Nous œuvrons pour le développement de la profession d'architecte et la garantie de la qualité de la pratique professionnelle dans la région orientale, à travers la formation continue et l'accompagnement technique et administratif des architectes."}
                </p>
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                <Link href="/architectes">
                  <Button size="lg" variant="secondary">
                    {isRTL ? "البحث عن مهندس معماري" : "Trouver un Architecte"}
                  </Button>
                </Link>
                <Link href="/appels-projets">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                  >
                    {isRTL ? "عرض دعوات المشاريع" : "Voir les Appels à Projets"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">150+</h3>
                <p className="text-gray-600">{isRTL ? "المهندسون المسجلون" : "Architectes Inscrits"}</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-600">{isRTL ? "المشاريع المكتملة" : "Projets Réalisés"}</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">25+</h3>
                <p className="text-gray-600">{isRTL ? "سنوات الخبرة" : "Années d'Expérience"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isRTL ? "آخر الأخبار" : "Dernières Actualités"}
              </h2>
              <p className="text-lg text-gray-600">
                {isRTL ? "ابق على اطلاع بآخر الأخبار والأحداث" : "Restez informé des dernières nouvelles et événements"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mockNews.map((news) => (
                <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className={`flex items-center justify-between mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Badge variant="secondary">{news.category}</Badge>
                      <span className="text-sm text-gray-500">{news.publishDate}</span>
                    </div>
                    <CardTitle className="line-clamp-2">{news.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{news.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      {isRTL ? "اقرأ المزيد" : "Lire Plus"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section className="py-16 bg-gray-50" id="doc-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isRTL ? "الوثائق الرسمية" : "Documents Officiels"}
              </h2>
              <p className="text-lg text-gray-600">
                {isRTL ? "تحميل الوثائق والنماذج الرسمية" : "Téléchargez les documents et formulaires officiels"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        <CardDescription>{doc.category}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span className="text-sm text-gray-500">{doc.size}</span>
                      <Button size="sm" variant="outline">
                        <Download className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                        {isRTL ? "تحميل" : "Télécharger"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white" id="contact">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{isRTL ? "اتصل بنا" : "Contactez-nous"}</h2>
              <p className="text-lg text-gray-600">
                {isRTL
                  ? "نحن هنا لمساعدتك والإجابة على استفساراتك"
                  : "Nous sommes là pour vous aider et répondre à vos questions"}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{isRTL ? "العنوان" : "Adresse"}</h3>
                    <p className="text-gray-600">Avenue Mohammed V, Oujda, Maroc</p>
                  </div>
                </div>
                <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{isRTL ? "الهاتف" : "Téléphone"}</h3>
                    <p className="text-gray-600">+212 536 12 34 56</p>
                  </div>
                </div>
                <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{isRTL ? "البريد الإلكتروني" : "Email"}</h3>
                    <p className="text-gray-600">contact@crao.ma</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>{isRTL ? "نموذج الاتصال" : "Formulaire de Contact"}</CardTitle>
                  <CardDescription>
                    {isRTL
                      ? "أرسل لنا رسالة وسنرد عليك في أقرب وقت"
                      : "Envoyez-nous un message et nous vous répondrons rapidement"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">{isRTL ? "الاسم الأول" : "Prénom"}</label>
                        <Input placeholder={isRTL ? "الاسم الأول" : "Prénom"} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">{isRTL ? "اسم العائلة" : "Nom"}</label>
                        <Input placeholder={isRTL ? "اسم العائلة" : "Nom"} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">{isRTL ? "البريد الإلكتروني" : "Email"}</label>
                      <Input type="email" placeholder="votre@email.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">{isRTL ? "الموضوع" : "Sujet"}</label>
                      <Input placeholder={isRTL ? "موضوع الرسالة" : "Sujet de votre message"} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">{isRTL ? "الرسالة" : "Message"}</label>
                      <Textarea placeholder={isRTL ? "اكتب رسالتك هنا..." : "Écrivez votre message ici..."} rows={4} />
                    </div>
                    <Button className="w-full">{isRTL ? "إرسال الرسالة" : "Envoyer le Message"}</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
