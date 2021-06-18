import { CustomDate } from '@/entities/Date';
import { Box } from '@material-ui/core'
import React, { createContext, useContext, useEffect, useState } from 'react'
import SEO, { Article, SeoType, SeoContext } from '@/components/SEO';
import { Ranking } from '../organisms/Ranking';
import { RANGE } from '@/repositories/YouTube';
import { useLocation, globalHistory } from "@reach/router"
import { parse } from "query-string"
import { PageContext } from '@/app/index';

export const RankingRouters = {
  daily: {name: "デイリー", link: "/ranking/daily"},
  weekly: {name: "ウィークリー", link: "/ranking/weekly"},
  monthly: {name: "マンスリー", link: "/ranking/monthly"},
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

const RankingPage: React.FC<PageContext> = ({pageContext}) => {
  const { site } = pageContext;
  const location = useLocation();
  const queryFromLocationSearch = (location: Location) => {
    const params = parse(location.search);
    const match = location.pathname.match(/^\/ranking\/([^/]+)/);
    try {
      // 正常に変換出来る場合はtを考慮した処理をすすめる
      if (params.t) {
        CustomDate.fromDatestring(params.t as string);
      }
      const rangeFromQuery = {range: match[1], t: params.t} as Query;
      return Object.keys(RANGE).includes(rangeFromQuery.range) ? rangeFromQuery : {range: "daily"} as Query;
    } catch (err) {
      const rangeFromQuery = {range: "daily"} as Query;
      return Object.keys(RANGE).includes(rangeFromQuery.range) ? rangeFromQuery : {range: "daily"} as Query;
    }
  }
  const articleFromQuery = (query: Query) => {
    if (!query.t) {
      return null;
    }
    const date = CustomDate.fromDatestring(query.t);
    date.setHours(date.getHours() + 17); // queryのtimeから17時間足すとちょうど集計時間の朝9時になる

    const displayDate =
      query.range === "daily" ?
      CustomDate.getDisplayDate(date) :
      query.range === "weekly" ?
      CustomDate.getDisplayDate(date) :
      CustomDate.getDisplayMonth(date);

    return {
      headline: `${displayDate} ${RankingRouters[query.range].name}ランキング`,
      image: site.siteMetadata.siteLogo,
      publishedAt: date,
    } as Article;
  }
  const initialQuery = queryFromLocationSearch(location);
  const initialArticle = articleFromQuery(initialQuery);

  const [query, setQuery] = useState<Query>(initialQuery);
  const [article, setArticle] = useState<Article>(initialArticle);
  const title = `${RankingRouters[query.range].name}ランキング`;
  const initialSeo = {
    subtitle: article?.headline || title,
    article: article,
  }
  const [seo, setSeo] = useState<SeoType>(initialSeo);


  useEffect(() => {
    // ナビゲーションタブのランキングをクリックしたときにstateをリセットさせる
    // useContextだと上のレイヤーにイベントが伝播しないため苦肉の策
    return globalHistory.listen(({ action, location }) => {
      const rangeFromQuery = queryFromLocationSearch(location);
      setQuery(rangeFromQuery);
    });
  }, []);

  const notices = {
    daily: ["デイリーランキングは毎日朝9時過ぎに前日の朝5時〜当日の朝5時前後の枠のスパチャ金額・メンバー加入数を更新しています"],
    weekly: ["ウィークリーランキングは毎週月曜の朝9時過ぎに前週分のスパチャ金額・メンバー加入数を更新しています"],
    monthly: ["マンスリーランキングは毎月１日の朝9時過ぎに前月分のスパチャ金額・メンバー加入数を更新しています"],
  }
  const ogpImage = {
    daily: "https://drive.google.com/uc?id=1gtcIIVuktGOKjmqSwgU5hu0PkX6eTXK9",
    weekly: "https://drive.google.com/uc?id=1ormi4L--eUs90Zop0cjAe4gW0KnDJw9M",
    monthly: "https://drive.google.com/uc?id=1dwtjcAoB41u5qLX6Xz4xaVABaArIYCbV",
  }
  site.siteMetadata.defaultImage = ogpImage[initialQuery.range]; // OGP画像は初回アクセス時の初期化値しか見られないので固定値を設定

  return (
    <SeoContext.Provider value={{seo, setSeo}}>
    <QueryContext.Provider value={{query, setQuery}}>
    <Box>
      <SEO site={site} />
      <Ranking category="all" range={query.range} time={query.t} notices={notices[query.range]} />
    </Box>
    </QueryContext.Provider>
    </SeoContext.Provider>
  )
}

export default RankingPage
