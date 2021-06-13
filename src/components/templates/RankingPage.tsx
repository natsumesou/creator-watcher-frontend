import { Box } from '@material-ui/core'
import React, { createContext, useContext, useEffect, useState } from 'react'
import SEO from '@/components/SEO';
import { Ranking } from '../organisms/Ranking';
import { RANGE } from '@/repositories/YouTube';
import { useLocation, globalHistory } from "@reach/router"
import { parse } from "query-string"

export const RankingRouters = {
  daily: {name: "デイリー"},
  weekly: {name: "ウィークリー"},
}

type Query = {
  range: RANGE,
  t?: string,
}

type ContextType = {
  query: Query,
  setQuery:(query: Query) => void
};

export const QueryContext = createContext<ContextType>({
  query: {range: "daily"},
  setQuery: () => {},
});
export const useQueryContext = () => useContext(QueryContext);

const RankingPage = ({pageContext}) => {
  const { search } = useLocation();
  const params = parse(search);
  const rangeFromQuery = {range: params.range, t: params.t} as Query;
  const initialQuery = Object.keys(RANGE).includes(rangeFromQuery.range) ? rangeFromQuery : {range: "daily"} as Query;
  const { site } = pageContext;
  const [query, setQuery] = useState<Query>(initialQuery);

  useEffect(() => {
    // ナビゲーションタブのランキングをクリックしたときにstateをリセットさせる
    // useContextだと上のレイヤーにイベントが伝播しないため苦肉の策
    return globalHistory.listen(({ action, location }) => {
      const params = parse(location.search);
      const rangeFromQuery = {range: params.range, t: params.t} as Query;

      if (action === 'PUSH') {
        if (rangeFromQuery.range === undefined && rangeFromQuery.t === undefined) {
          setQuery({range: "daily"});
        }
      }
    })
  }, []);

  const notices = {
    daily: ["デイリーランキングは毎日朝5時過ぎに前日の朝5時〜当日の朝5時前後の枠のスパチャ金額・メンバー加入数を集計しています"],
    weekly: ["ウィークリーランキングは毎週月曜の朝5時過ぎに前週分のスパチャ金額・メンバー加入数を集計しています"],
  }
  const ogpImage = {
    daily: "https://drive.google.com/uc?id=1gtcIIVuktGOKjmqSwgU5hu0PkX6eTXK9",
    weekly: "https://drive.google.com/uc?id=1ormi4L--eUs90Zop0cjAe4gW0KnDJw9M",
  }
  site.siteMetadata.defaultImage = ogpImage[query.range];
  return (
    <QueryContext.Provider value={{query, setQuery}}>
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle={RankingRouters[query.range].name + "ランキング"} />
      <Ranking category="all" range={query.range} time={query.t} notices={notices[query.range]} />
    </Box>
    </QueryContext.Provider>
  )
}

export default RankingPage
