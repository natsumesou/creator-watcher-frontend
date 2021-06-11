import { Box } from '@material-ui/core'
import React from 'react'
import SEO from '@/components/SEO';
import { Timeline } from '../organisms/Timeline';

const NijisanjiPage = ({ pageContext }) => {
  const { site } = pageContext;
  const notices = [
    "にじさんじの一部チャンネルのみ取得しています",
  ];
  
  return (
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="にじさんじ" />
      <Timeline category="nijisanji" notices={notices} />
    </Box>
  )
}

export default NijisanjiPage
