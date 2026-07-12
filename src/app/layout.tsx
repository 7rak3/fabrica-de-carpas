import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fábrica de Carpas Chile | Carpas Corporativas para Eventos',
  description: 'Somos la principal fábrica de carpas en Chile. Especialistas en carpas corporativas de alta resistencia, domos iglú y estructuras para marketing industrial con 25 años de experiencia.',
  keywords: 'fabrica de carpas, carpas corporativas, carpas para eventos, carpas domo, carpas iglu, arriendo de carpas, carpas industriales chile',
  alternates: {
    canonical: 'https://fabricadecarpas.cl',
  },
  openGraph: {
    title: 'Fábrica de Carpas Chile | Carpas Corporativas Premium',
    description: 'Estructuras de alta resistencia para eventos masivos y marketing corporativo en todo Chile. 25 años fabricando calidad.',
    url: 'https://fabricadecarpas.cl',
    siteName: 'Fábrica de Carpas Chile',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fábrica de Carpas Chile - Carpas Corporativas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fábrica de Carpas Chile | Carpas Corporativas',
    description: 'Expertos en fabricación de carpas estructurales y domos para eventos corporativos en Chile.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Fábrica de Carpas Chile",
    "image": "https://fabricadecarpas.cl/og-image.png",
    "@id": "https://fabricadecarpas.cl",
    "url": "https://fabricadecarpas.cl",
    "telephone": "+56959192685",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dirección de la Fábrica",
      "addressLocality": "Santiago",
      "addressRegion": "RM",
      "postalCode": "000000",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.4489,
      "longitude": -70.6693
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/fabricadecarpas",
      "https://www.instagram.com/fabricadecarpas"
    ],
    "description": "Líderes en fabricación de carpas corporativas y estructuras para eventos en Chile con más de 25 años de trayectoria."
  }

  return (
    <html lang="es">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
