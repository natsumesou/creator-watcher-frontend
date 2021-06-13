import React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { CustomDate } from "@/entities/Date"

export type SiteMetadata = {
  title: string,
  description: string,
  siteUrl: string,
  siteLogo: string,
  defaultImage: string,
  author: string,
}

export type Article = {
  headline: string,
  image: string,
  publishedAt: CustomDate,
}

type Props = {
  siteMetadata: SiteMetadata,
  subtitle: string,
  article?: Article,
}

const SEO: React.FC<Props> = ({siteMetadata, subtitle, article}) => {
  const { href } = useLocation()
  const title = subtitle ?
  subtitle + " - " + siteMetadata.title : siteMetadata.title;
  const nocache = new Date().getTime();
  const seo = {
    title: title,
    description: siteMetadata.description,
    image: siteMetadata.defaultImage + "&_=" + nocache,
    url: href,
  }

  return (
    <Helmet script={article ? [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": href
          },
          "headline": article.headline,
          "image": [
            article.image,
          ],
          "datePublished": article.publishedAt.toISOString(),
          "dateModified": article.publishedAt.toISOString(),
          "author": {
            "@type": "Person",
            "name": siteMetadata.author
          },
          "publisher": {
            "@type": "Organization",
            "name": siteMetadata.author,
            "logo": {
              "@type": "ImageObject",
              "url": siteMetadata.siteLogo
            }
          }
        }),
      }
    ] : []}
    title={seo.title} htmlAttributes={{lang: 'ja'}}>
      <title>{title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  )
}

export default SEO