"use client"

import Head from "next/head"
import { usePathname } from "next/navigation"

interface SeoProps {
  title?: string
  description?: string
  image?: string
  type?: string
  date?: string
}

export function Seo({
  title = "Portfolio Template",
  description = "A professional portfolio template showcasing projects, experience, and skills for developers and designers.",
  image = "/og-image.jpg",
  type = "website",
  date,
}: SeoProps) {
  const pathname = usePathname()
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://portfolio-template.vercel.app"
  const url = `${baseUrl}${pathname}`

  return (
    <Head>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === "article" ? "Article" : "WebPage",
            headline: title,
            image: [`${baseUrl}${image}`],
            datePublished: date,
            dateModified: date,
            author: {
              "@type": "Person",
              name: "Your Name",
            },
            description: description,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": url,
            },
          }),
        }}
      />
    </Head>
  )
}
