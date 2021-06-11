import { Box } from '@material-ui/core'
import React from 'react'
import SEO from '@/components/SEO';
import { Timeline } from '../organisms/Timeline';

const HololivePage = ({ pageContext }) => {
  const { site } = pageContext;
  const notices = [
    "ホロライブ(JP)のメンバーのみ取得しています"
  ]
  return (
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="ホロライブ" />
      <Timeline category="hololive" notices={notices} />
    </Box>
  )
}

export default HololivePage
