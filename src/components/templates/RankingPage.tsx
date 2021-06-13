import { Box } from '@material-ui/core'
import React, { createContext, useContext, useEffect, useState } from 'react'
import SEO from '@/components/SEO';
import { Ranking } from '../organisms/Ranking';
import { RANGE } from '@/repositories/YouTube';
import { useLocation, globalHistory } from "@reach/router"
import { parse } from "query-string"
import { CustomDate } from '@/entities/Date';

export const RankingRouters = {
  daily: {name: "デイリー"},
  weekly: {name: "ウィークリー"},
  monthly: {name: "マンスリー"},
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
  const { site } = pageContext;
  const location = useLocation();
  const queryFromLocationSearch = (location: Location) => {
    const params = parse(location.search);
    try {
      // 正常に変換出来る場合はtを考慮した処理をすすめる
      CustomDate.fromDatestring(params.t as string);
      const rangeFromQuery = {range: params.range, t: params.t} as Query;
      return Object.keys(RANGE).includes(rangeFromQuery.range) ? rangeFromQuery : {range: "daily"} as Query;
    } catch (err) {
      const rangeFromQuery = {range: params.range} as Query;
      return Object.keys(RANGE).includes(rangeFromQuery.range) ? rangeFromQuery : {range: "daily"} as Query;
    }
  }
  const initialQuery = queryFromLocationSearch(location);
  const [query, setQuery] = useState<Query>(initialQuery);

  useEffect(() => {
    // ナビゲーションタブのランキングをクリックしたときにstateをリセットさせる
    // useContextだと上のレイヤーにイベントが伝播しないため苦肉の策
    return globalHistory.listen(({ action, location }) => {
      const rangeFromQuery = queryFromLocationSearch(location);
      setQuery(rangeFromQuery);
    });
  }, []);

  const notices = {
    daily: ["デイリーランキングは毎日朝5時過ぎに前日の朝5時〜当日の朝5時前後の枠のスパチャ金額・メンバー加入数を集計しています"],
    weekly: ["ウィークリーランキングは毎週月曜の朝5時過ぎに前週分のスパチャ金額・メンバー加入数を集計しています"],
    monthly: ["マンスリーランキングは毎月１日の朝5時過ぎに前月分のスパチャ金額・メンバー加入数を集計しています"],
  }
  const ogpImage = {
    daily: "https://drive.google.com/uc?id=1gtcIIVuktGOKjmqSwgU5hu0PkX6eTXK9",
    weekly: "https://drive.google.com/uc?id=1ormi4L--eUs90Zop0cjAe4gW0KnDJw9M",
    monthly: "https://drive.google.com/uc?id=1dwtjcAoB41u5qLX6Xz4xaVABaArIYCbV",
  }
  site.siteMetadata.defaultImage = ogpImage[initialQuery.range]; // OGP画像は初回アクセス時の初期化値しか見られないので固定値を設定

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
