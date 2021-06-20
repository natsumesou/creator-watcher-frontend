import { Box } from '@material-ui/core'
import React, { useState } from 'react'
import SEO, { SeoType, SeoContext } from '@/components/SEO';
import { Timeline } from '../organisms/Timeline';
import { ChannelIndex } from '../organisms/ChannelIndex';

const NijisanjiPage = ({ pageContext }) => {
  const { site } = pageContext;
  const notices = [
    "にじさんじの一部チャンネルのみ取得しています",
  ];
  const [seo, setSeo] = useState<SeoType>({
    subtitle: "にじさんじ",
  });

  return (
    <SeoContext.Provider value={{seo, setSeo}}>
    <Box>
      <SEO site={site} />
      <ChannelIndex category="nijisanji" />
      <Timeline category="nijisanji" notices={notices} />
    </Box>
    </SeoContext.Provider>
  )
}

export default NijisanjiPage
