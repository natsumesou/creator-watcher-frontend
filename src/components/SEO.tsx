import React, { createContext, useContext } from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { CustomDate } from "@/entities/Date"
import { SiteMetadata } from "@/app"

export type Article = {
  headline: string,
  image: string,
  publishedAt: CustomDate,
}

export type SeoType = {
  subtitle?: string,
  article?: Article,
}

type ContextType = {
  seo: SeoType,
  setSeo:(seo: SeoType) => void
};

type Props = {
  [site:string]: {
    [siteMetadata:string]: SiteMetadata,
  }
}

export const SeoContext = createContext<ContextType>({
  seo: null,
  setSeo: () => {},
});
export const useSeoContext = () => useContext(SeoContext);

const SEO: React.FC<Props> = ({site}) => {
  const { href } = useLocation()
  const { seo, setSeo } = useSeoContext();
  const title = seo.subtitle ?
  seo.subtitle + " - " + site.siteMetadata.title : site.siteMetadata.title;
  const nocache = new Date().getTime();
  const meta = {
    title: title,
    description: site.siteMetadata.description,
    image: site.siteMetadata.defaultImage + (site.siteMetadata.defaultImage.includes("?") ? "&_=" : "?_=" ) + nocache,
    url: href,
  }

  return (
    <Helmet script={seo.article ? [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": href
          },
          "headline": seo.article.headline,
          "image": [
            seo.article.image,
          ],
          "datePublished": seo.article.publishedAt.toISOString(),
          "dateModified": seo.article.publishedAt.toISOString(),
          "author": {
            "@type": "Person",
            "name": site.siteMetadata.author
          },
          "publisher": {
            "@type": "Organization",
            "name": site.siteMetadata.author,
            "logo": {
              "@type": "ImageObject",
              "url": site.siteMetadata.siteLogo
            }
          }
        }),
      }
    ] : []}
    title={meta.title} htmlAttributes={{lang: 'ja'}}>
      <title>{title}</title>
      <meta name="description" content={meta.description} />
      <meta name="image" content={meta.image} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Helmet>
  )
}

export default SEO