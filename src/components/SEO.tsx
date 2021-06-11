import React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"

export type SiteMetadata = {
  title: string,
  description: string,
  siteUrl: string,
  defaultImage: string,
}

type Props = {
  siteMetadata: SiteMetadata,
  subtitle: string,
}

const SEO: React.FC<Props> = ({siteMetadata, subtitle}) => {
  const { pathname } = useLocation()
  const title = subtitle ?
  subtitle + " - " + siteMetadata.title : siteMetadata.title;
  const nocache = new Date().getTime();

  const seo = {
    title: siteMetadata.title,
    description: siteMetadata.description,
    image: siteMetadata.defaultImage + "&_=" + nocache,
    url: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <Helmet title={seo.title} htmlAttributes={{lang: 'ja'}}>
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