import { Box } from '@material-ui/core'
import React from 'react'
import SEO from '@/components/SEO';
import { Ranking } from '../organisms/Ranking';

const RankingPage = ({pageContext }) => {
  const { site } = pageContext;

  return (
    <Box>
      <SEO siteMetadata={site.siteMetadata} />
      <Ranking />
    </Box>
  )
}

export default RankingPage
