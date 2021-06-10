import { Box } from '@material-ui/core'
import React from 'react'
import SEO from '@/components/SEO';
import { Timeline } from '../organisms/Timeline';

const NijisanjiPage = ({ pageContext }) => {
  const { site } = pageContext;

  return (
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="にじさんじ" />
      <Timeline category="nijisanji" />
    </Box>
  )
}

export default NijisanjiPage
