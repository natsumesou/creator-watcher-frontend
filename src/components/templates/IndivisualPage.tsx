import { Box } from '@material-ui/core'
import React from 'react'
import SEO from '@/components/SEO';
import { Indivisual } from '../organisms/Indivisual';

const IndivisualPage = ({pageContext }) => {
  const { site } = pageContext;

  return (
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="個別" />
      <Indivisual />
    </Box>
  )
}

export default IndivisualPage
