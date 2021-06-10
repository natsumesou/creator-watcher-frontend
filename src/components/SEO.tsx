import React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"

const SEO = ({siteMetadata}) => {
  const { pathname } = useLocation()

  const {
    title,
    description,
    siteUrl,
  } = siteMetadata

  const seo = {
    title: title,
    description: description,
//    image: `${siteUrl}${ogpImage}`,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet title={seo.title} htmlAttributes={{lang: 'ja'}}>
      <meta name="description" content={seo.description} />
{/*      <meta name="image" content={seo.image} /> */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
{/*      <meta property="og:image" content={seo.image} /> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
{/*      <meta name="twitter:image" content={seo.image} /> */}
    </Helmet>
  )
}

export default SEO