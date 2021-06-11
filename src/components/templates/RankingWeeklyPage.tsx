import { Box } from '@material-ui/core'
import React from 'react'
import SEO, { SiteMetadata } from '@/components/SEO';
import { Ranking } from '../organisms/Ranking';

const RankingWeeklyPage = ({pageContext}) => {
  const { site } = pageContext;
  const notices = [
    "ウィークリーランキングは毎週月曜の朝5時過ぎに前週分のスパチャ金額・メンバー加入数を集計しています",
  ]
  const weeklyOGPLink = "https://drive.google.com/uc?id=1ormi4L--eUs90Zop0cjAe4gW0KnDJw9M";
  site.siteMetadata.defaultImage = weeklyOGPLink;
  console.log(site.siteMetadata);

  return (
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="ウィークリーランキング" />
      <Ranking category="all" range="weekly" notices={notices} />
    </Box>
  )
}

export default RankingWeeklyPage
