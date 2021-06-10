import { Box } from '@material-ui/core'
import React from 'react'
import SEO from '@/components/SEO';
import { Timeline } from '../organisms/Timeline';

const HomePage = ({ pageContext }) => {
  const { site } = pageContext;

  return (
    <Box>
      <SEO siteMetadata={site.siteMetadata} />
      <Timeline />
    </Box>
  )
}

export default HomePage
