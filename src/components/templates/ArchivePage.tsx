import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import SEO from '@/components/SEO';
import { RankingArchive } from '../organisms/RankingArchive';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    area: {
      minHeight: '300px',
    },
  }),
);

const ArchivePage = ({ pageContext }) => {
  const classes = useStyles();
  const { site } = pageContext;

  return (
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="ランキングアーカイブ" />
      <RankingArchive />
      {/* 広告枠用 */}
      <Box id="free-area-of-archive" className={classes.area}></Box>
    </Box>
  )
}

export default ArchivePage
