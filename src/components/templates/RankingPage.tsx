import { Box } from '@material-ui/core'
import React from 'react'
import SEO, { SiteMetadata } from '@/components/SEO';
import { Ranking } from '../organisms/Ranking';

const RankingPage = ({pageContext}) => {
  const { site } = pageContext;

  return (
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="ランキング" />
      <Ranking />
    </Box>
  )
}

export default RankingPage
