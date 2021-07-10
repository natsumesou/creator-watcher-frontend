import { Box } from '@material-ui/core'
import React, { useState } from 'react'
import SEO, { SeoType, SeoContext } from '@/components/SEO';
import { Timeline } from '../organisms/Timeline';
import { ChannelIndex } from '../organisms/ChannelIndex';

const HololivePage = ({ pageContext }) => {
  const { site } = pageContext;
  const notices = [
    "ホロライブ/ホロライブ ID(インドネシア)/ホロライブ EN(English)のチャンネルを取得しています"
  ]
  const [seo, setSeo] = useState<SeoType>({
    subtitle: "ホロライブ",
    description: "ホロライブ/hololive-ID(Indonesia)/hololive-EN(English) で配信が終了したものからスパチャを集計してタイムライン形式で表示",
  });

  return (
    <SeoContext.Provider value={{seo, setSeo}}>
    <Box>
      <SEO site={site} />
      <ChannelIndex category="hololive" />
      <Timeline category="hololive" notices={notices} />
    </Box>
    </SeoContext.Provider>
  )
}

export default HololivePage
