import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import SEO, { SeoType,SeoContext } from '@/components/SEO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {

    },
    area: {
      minHeight: '300px',
    },
  }),
);

const ArticleBase = ({ pageContext, subtitle, children }) => {
  const classes = useStyles();
  const { site } = pageContext;
  const [seo, setSeo] = useState<SeoType>({
    subtitle: subtitle,
  });

  return (
    <SeoContext.Provider value={{seo, setSeo}}>
      <SEO site={site} />
      <Box className={classes.description}>
        <Typography  component="p" variant="body1">Virtula YouTuberのスーパーチャットランキング上位５位の集計と、それらの配信内容を分析したブログサイトです。よかったら高評価、ブックマークよろしくおねがいします。</Typography>
      </Box>
      <Box className={classes.area}>
          {children}
      </Box>
    </SeoContext.Provider>
  )
}

export default ArticleBase
