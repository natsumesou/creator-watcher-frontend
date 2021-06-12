import { Box } from '@material-ui/core'
import React, { createContext, useContext, useState } from 'react'
import SEO from '@/components/SEO';
import { Ranking } from '../organisms/Ranking';
import { RANGE } from '@/repositories/YouTube';
import { useLocation } from "@reach/router"
import { parse } from "query-string"

export const RankingRouters = {
  daily: {name: "デイリー"},
  weekly: {name: "ウィークリー"},
}

type ContextType = {
  range: RANGE,
  setRange:(range: RANGE) => void
};

export const RangeContext = createContext<ContextType>({
  range: "daily",
  setRange: () => {},
});
export const useRangeContext = () => useContext(RangeContext);

const RankingPage = ({pageContext}) => {
  const { search } = useLocation();
  const params = parse(search);
  const rangeFromQuery = params.range;
  const initialRange = (typeof rangeFromQuery === "string") && Object.keys(RANGE).includes(rangeFromQuery) ? rangeFromQuery as RANGE : "daily";
  const { site } = pageContext;
  const [range, setRange] = useState<RANGE>(initialRange);

  const notices = {
    daily: ["デイリーランキングは毎日朝5時過ぎに前日の朝5時〜当日の朝5時前後の枠のスパチャ金額・メンバー加入数を集計しています"],
    weekly: ["ウィークリーランキングは毎週月曜の朝5時過ぎに前週分のスパチャ金額・メンバー加入数を集計しています"],
  }
  const ogpImage = {
    daily: "https://drive.google.com/uc?id=1gtcIIVuktGOKjmqSwgU5hu0PkX6eTXK9",
    weekly: "https://drive.google.com/uc?id=1ormi4L--eUs90Zop0cjAe4gW0KnDJw9M",
  }
  site.siteMetadata.defaultImage = ogpImage[range];

  return (
    <RangeContext.Provider value={{range, setRange}}>
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle={RankingRouters[range].name + "ランキング"} />
      <Ranking category="all" range={range} notices={notices[range]} />
    </Box>
    </RangeContext.Provider>
  )
}

export default RankingPage
