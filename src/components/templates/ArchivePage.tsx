import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import SEO, { SeoType,SeoContext } from '@/components/SEO';
import { RankingArchive } from '../organisms/RankingArchive';
import { DisplayAds } from '../atoms/ads/DisplayAds';

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
  const [seo, setSeo] = useState<SeoType>({
    subtitle: "ランキングアーカイブ",
  });

  return (
    <SeoContext.Provider value={{seo, setSeo}}>
      <SEO site={site} />
      <RankingArchive />
      {/* 広告枠用 */}
      <Box id="free-area-of-archive" className={classes.area}><DisplayAds /></Box>
    </SeoContext.Provider>
  )
}

export default ArchivePage
