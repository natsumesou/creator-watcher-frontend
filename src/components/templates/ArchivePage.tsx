import { Box } from '@material-ui/core'
import React from 'react'
import SEO from '@/components/SEO';
import { RankingArchive } from '../organisms/RankingArchive';

const ArchivePage = ({ pageContext }) => {
  const { site } = pageContext;
  const notices = [
    "過去のランキングのアーカイブです"
  ]
  return (
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="ランキングアーカイブ" />
      <RankingArchive />
      <Box id="free-area-of-archive">hoge</Box>
    </Box>
  )
}

export default ArchivePage
