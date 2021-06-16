import { Box } from '@material-ui/core'
import React, { useState } from 'react'
import SEO, { SeoType, SeoContext } from '@/components/SEO';
import { Timeline } from '../organisms/Timeline';

const HololivePage = ({ pageContext }) => {
  const { site } = pageContext;
  const notices = [
    "ホロライブ(JP)のチャンネルのみ取得しています"
  ]
  const [seo, setSeo] = useState<SeoType>({
    subtitle: "ホロライブ",
  });

  return (
    <SeoContext.Provider value={{seo, setSeo}}>
    <Box>
      <SEO site={site} />
      <Timeline category="hololive" notices={notices} />
    </Box>
    </SeoContext.Provider>
  )
}

export default HololivePage
