import { Box } from '@material-ui/core'
import React, { useState } from 'react'
import SEO, { SeoType, SeoContext } from '@/components/SEO';
import { Timeline } from '../organisms/Timeline';

const HomePage = ({ pageContext }) => {
  const { site } = pageContext;
  const [seo, setSeo] = useState<SeoType>({
    subtitle: "タイムライン",
  });

  return (
    <SeoContext.Provider value={{seo, setSeo}}>
    <Box>
      <SEO site={site} />
      <Timeline category="all" />
    </Box>
    </SeoContext.Provider>
  )
}

export default HomePage
