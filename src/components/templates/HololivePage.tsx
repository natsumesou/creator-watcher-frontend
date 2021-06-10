import { Box } from '@material-ui/core'
import React from 'react'
import SEO from '@/components/SEO';
import { Timeline } from '../organisms/Timeline';

const HololivePage = ({ pageContext }) => {
  const { site } = pageContext;

  return (
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="ホロライブ" />
      <Timeline category="hololive" />
    </Box>
  )
}

export default HololivePage
