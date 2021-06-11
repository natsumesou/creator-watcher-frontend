import { Box } from '@material-ui/core'
import React from 'react'
import SEO, { SiteMetadata } from '@/components/SEO';
import { Ranking } from '../organisms/Ranking';

const RankingPage = ({pageContext}) => {
  const { site } = pageContext;
  const notices = [
    "デイリーランキングは毎日朝5時過ぎに前日の朝5時〜当日の朝5時前後の枠のスパチャ金額・メンバー加入数を集計しています",
  ]

  return (
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="デイリーランキング" />
      <Ranking category="all" range="daily" notices={notices} />
    </Box>
  )
}

export default RankingPage
