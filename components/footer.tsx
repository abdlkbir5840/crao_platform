import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function Footer() {
  const links = [
    { name: "ANCFCC", href: "https://ancfcc.ma", external: true },
    { name: "Agence Urbaine", href: "https://au-oujda.ma", external: true },
    { name: "Ministère de l'Habitat", href: "https://mhpv.gov.ma", external: true },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">CRAO</h3>
                <p className="text-sm text-gray-400">Zone Orientale</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Le Conseil Régional des Architectes de la Zone Orientale est l'organisme représentatif des architectes de
              la région orientale du Maroc.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Avenue Mohammed V</p>
              <p>Oujda, Maroc</p>
              <p>Tél: +212 536 12 34 56</p>
              <p>Email: contact@crao.ma</p>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
            <div className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {link.name}
                  {link.external && <ExternalLink className="h-3 w-3 ml-1" />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 CRAO - Zone Orientale. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
