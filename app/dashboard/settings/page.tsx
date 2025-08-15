"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Bell, Shield, Palette, User, Save, Trash2, Eye, EyeOff, Smartphone, Mail, MessageSquare } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function SettingsPage() {
  const { t, isRTL } = useLanguage()
  const [activeTab, setActiveTab] = useState("notifications")
  const [showPassword, setShowPassword] = useState(false)

  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    contractUpdates: true,
    paymentReminders: true,
    visaStatusUpdates: true,
    ticketResponses: true,

    // Security
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: "30",

    // Appearance
    theme: "light",
    language: "fr",
    dateFormat: "dd/mm/yyyy",
    currency: "MAD",

    // Account
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSave = (section: string) => {
    // Save logic for specific section
    console.log(`Saving ${section} settings:`, settings)
  }

  const handleDeleteAccount = () => {
    // Delete account logic
    console.log("Account deletion requested")
  }

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
              <BreadcrumbPage>{isRTL ? "الإعدادات" : "Paramètres"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isRTL ? "الإعدادات" : "Paramètres"}</h1>
            <p className="text-muted-foreground">
              {isRTL ? "إدارة إعدادات حسابك وتفضيلاتك" : "Gérez les paramètres de votre compte et vos préférences"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              {isRTL ? "الإشعارات" : "Notifications"}
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {isRTL ? "الأمان" : "Sécurité"}
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              {isRTL ? "المظهر" : "Apparence"}
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {isRTL ? "الحساب" : "Compte"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "إعدادات الإشعارات" : "Paramètres de Notifications"}</CardTitle>
                <CardDescription>
                  {isRTL
                    ? "اختر كيف تريد أن تتلقى الإشعارات"
                    : "Choisissez comment vous souhaitez recevoir les notifications"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{isRTL ? "طرق الإشعار" : "Méthodes de Notification"}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <Label className="text-base">
                            {isRTL ? "إشعارات البريد الإلكتروني" : "Notifications par Email"}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? "تلقي الإشعارات عبر البريد الإلكتروني" : "Recevoir les notifications par email"}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <Label className="text-base">
                            {isRTL ? "إشعارات الرسائل النصية" : "Notifications par SMS"}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? "تلقي الإشعارات عبر الرسائل النصية" : "Recevoir les notifications par SMS"}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <Label className="text-base">{isRTL ? "الإشعارات الفورية" : "Notifications Push"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {isRTL
                              ? "تلقي الإشعارات الفورية على الجهاز"
                              : "Recevoir les notifications push sur l'appareil"}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{isRTL ? "أنواع الإشعارات" : "Types de Notifications"}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">{isRTL ? "تحديثات العقود" : "Mises à jour des contrats"}</Label>
                      <Switch
                        checked={settings.contractUpdates}
                        onCheckedChange={(checked) => setSettings({ ...settings, contractUpdates: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-base">{isRTL ? "تذكيرات الدفع" : "Rappels de paiement"}</Label>
                      <Switch
                        checked={settings.paymentReminders}
                        onCheckedChange={(checked) => setSettings({ ...settings, paymentReminders: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-base">
                        {isRTL ? "تحديثات حالة التأشيرة" : "Mises à jour du statut de visa"}
                      </Label>
                      <Switch
                        checked={settings.visaStatusUpdates}
                        onCheckedChange={(checked) => setSettings({ ...settings, visaStatusUpdates: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-base">{isRTL ? "ردود التذاكر" : "Réponses aux tickets"}</Label>
                      <Switch
                        checked={settings.ticketResponses}
                        onCheckedChange={(checked) => setSettings({ ...settings, ticketResponses: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("notifications")}>
                    <Save className="mr-2 h-4 w-4" />
                    {isRTL ? "حفظ الإعدادات" : "Enregistrer les paramètres"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "إعدادات الأمان" : "Paramètres de Sécurité"}</CardTitle>
                <CardDescription>
                  {isRTL ? "إدارة أمان حسابك وخصوصيتك" : "Gérez la sécurité de votre compte et votre confidentialité"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        {isRTL ? "المصادقة الثنائية" : "Authentification à deux facteurs"}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {isRTL
                          ? "إضافة طبقة أمان إضافية لحسابك"
                          : "Ajouter une couche de sécurité supplémentaire à votre compte"}
                      </p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">{isRTL ? "تنبيهات تسجيل الدخول" : "Alertes de connexion"}</Label>
                      <p className="text-sm text-muted-foreground">
                        {isRTL
                          ? "تلقي تنبيهات عند تسجيل الدخول من جهاز جديد"
                          : "Recevoir des alertes lors de connexions depuis un nouvel appareil"}
                      </p>
                    </div>
                    <Switch
                      checked={settings.loginAlerts}
                      onCheckedChange={(checked) => setSettings({ ...settings, loginAlerts: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">
                      {isRTL ? "انتهاء مهلة الجلسة (بالدقائق)" : "Délai d'expiration de session (minutes)"}
                    </Label>
                    <Select
                      value={settings.sessionTimeout}
                      onValueChange={(value) => setSettings({ ...settings, sessionTimeout: value })}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 {isRTL ? "دقيقة" : "minutes"}</SelectItem>
                        <SelectItem value="30">30 {isRTL ? "دقيقة" : "minutes"}</SelectItem>
                        <SelectItem value="60">60 {isRTL ? "دقيقة" : "minutes"}</SelectItem>
                        <SelectItem value="120">120 {isRTL ? "دقيقة" : "minutes"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{isRTL ? "تغيير كلمة المرور" : "Changer le mot de passe"}</h3>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">{isRTL ? "كلمة المرور الحالية" : "Mot de passe actuel"}</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={settings.currentPassword}
                          onChange={(e) => setSettings({ ...settings, currentPassword: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">{isRTL ? "كلمة المرور الجديدة" : "Nouveau mot de passe"}</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={settings.newPassword}
                        onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        {isRTL ? "تأكيد كلمة المرور" : "Confirmer le mot de passe"}
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={settings.confirmPassword}
                        onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("security")}>
                    <Save className="mr-2 h-4 w-4" />
                    {isRTL ? "حفظ الإعدادات" : "Enregistrer les paramètres"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "إعدادات المظهر" : "Paramètres d'Apparence"}</CardTitle>
                <CardDescription>
                  {isRTL
                    ? "تخصيص مظهر التطبيق وتفضيلاتك"
                    : "Personnalisez l'apparence de l'application et vos préférences"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">{isRTL ? "المظهر" : "Thème"}</Label>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) => setSettings({ ...settings, theme: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">{isRTL ? "فاتح" : "Clair"}</SelectItem>
                        <SelectItem value="dark">{isRTL ? "داكن" : "Sombre"}</SelectItem>
                        <SelectItem value="system">{isRTL ? "النظام" : "Système"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">{isRTL ? "اللغة" : "Langue"}</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => setSettings({ ...settings, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">{isRTL ? "تنسيق التاريخ" : "Format de date"}</Label>
                    <Select
                      value={settings.dateFormat}
                      onValueChange={(value) => setSettings({ ...settings, dateFormat: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">{isRTL ? "العملة" : "Devise"}</Label>
                    <Select
                      value={settings.currency}
                      onValueChange={(value) => setSettings({ ...settings, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MAD">MAD - {isRTL ? "درهم مغربي" : "Dirham Marocain"}</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="USD">USD - {isRTL ? "دولار أمريكي" : "Dollar Américain"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("appearance")}>
                    <Save className="mr-2 h-4 w-4" />
                    {isRTL ? "حفظ الإعدادات" : "Enregistrer les paramètres"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "إعدادات الحساب" : "Paramètres du Compte"}</CardTitle>
                <CardDescription>
                  {isRTL
                    ? "إدارة معلومات حسابك وإعدادات الخصوصية"
                    : "Gérez les informations de votre compte et les paramètres de confidentialité"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountEmail">{isRTL ? "البريد الإلكتروني" : "Email du compte"}</Label>
                      <Input
                        id="accountEmail"
                        type="email"
                        value="john.doe@example.com"
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountPhone">{isRTL ? "رقم الهاتف" : "Numéro de téléphone"}</Label>
                      <Input
                        id="accountPhone"
                        value="+212 6 12 34 56 78"
                        onChange={(e) => console.log(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-red-600">{isRTL ? "منطقة الخطر" : "Zone de Danger"}</h3>
                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-red-800">{isRTL ? "حذف الحساب" : "Supprimer le compte"}</h4>
                        <p className="text-sm text-red-600 mt-1">
                          {isRTL
                            ? "حذف حسابك نهائياً. هذا الإجراء لا يمكن التراجع عنه."
                            : "Supprimez définitivement votre compte. Cette action est irréversible."}
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {isRTL ? "حذف الحساب" : "Supprimer le compte"}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {isRTL ? "هل أنت متأكد؟" : "Êtes-vous absolument sûr ?"}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {isRTL
                                ? "هذا الإجراء لا يمكن التراجع عنه. سيتم حذف حسابك نهائياً وإزالة جميع بياناتك من خوادمنا."
                                : "Cette action ne peut pas être annulée. Cela supprimera définitivement votre compte et supprimera vos données de nos serveurs."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{isRTL ? "إلغاء" : "Annuler"}</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                              {isRTL ? "نعم، احذف حسابي" : "Oui, supprimer mon compte"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("account")}>
                    <Save className="mr-2 h-4 w-4" />
                    {isRTL ? "حفظ الإعدادات" : "Enregistrer les paramètres"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
