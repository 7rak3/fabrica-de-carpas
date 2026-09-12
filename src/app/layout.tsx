import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://fabricadecarpas.cl'),
  title: 'Fábrica de Carpas Chile | 25 Años de Excelencia',
  description: 'Fabricación de carpas estructurales tipo domo iglú para eventos corporativos y marketing en todo Chile. Despacho e instalación nacional.',
  alternates: {
    canonical: 'https://fabricadecarpas.cl',
  },
  openGraph: {
    title: 'Fábrica de Carpas Chile | 25 Años de Excelencia',
    description: 'Fabricación de carpas estructurales tipo domo iglú para eventos corporativos y marketing en todo Chile.',
    url: 'https://fabricadecarpas.cl',
    siteName: 'Fábrica de Carpas Chile',
    locale: 'es_CL',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TF3VC8BV');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Fábrica de Carpas Chile',
              url: 'https://fabricadecarpas.cl',
              telephone: '+56959192685',
              description: 'Fabricación industrial de carpas estructurales tipo domo iglú para eventos corporativos y marketing en todo Chile con 25 años de experiencia.',
              areaServed: {
                '@type': 'Country',
                name: 'Chile',
              },
              knowsAbout: [
                'Carpas estructurales',
                'Domos Iglú',
                'Banderas Vela publicitarias',
                'Rollers publicitarios',
                'Roll-Up corporativos',
                'Eventos corporativos',
                'Activaciones de marketing',
                'Estructuras de aluminio 6061-T6'
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'CL',
              },
              priceRange: '$$$',
            }),
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TF3VC8BV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
