import { Box } from '@material-ui/core'
import React, { createContext, useContext, useState } from 'react'
import SEO, { SeoContext, SeoType } from '@/components/SEO';
import { useLocation } from "@reach/router"
import { parse } from "query-string"
import { WatchSuperChats } from '../organisms/WatchSuperChats';
import { PageContext } from '@/app';
import { StreamIndex } from '../organisms/StreamIndex';

export type Query = {
  cid?: string,
  vid?: string,
}

type ContextType = {
  query: Query,
  setQuery:(query: Query) => void
};

export const QueryContext = createContext<ContextType>({
  query: null,
  setQuery: () => {},
});
export const useQueryContext = () => useContext(QueryContext);

const WatchPage: React.FC<PageContext> = ({pageContext}) => {
  const { site } = pageContext;
  const location = useLocation();
  const params = parse(location.search) as {vid: string, cid: string};
  const [query, setQuery] = useState<Query>({vid: params.vid, cid: params.cid});
  const [seo, setSeo] = useState<SeoType>({
    subtitle: "配信詳細",
  });
  const notices = [
    "アーカイブで取得できないスパチャはカウントされません",
    "配信でのスパチャ金額上位５位までを表示します。同率が複数いる場合は５位以内がすべて表示されます。"
  ]

  return (
    <SeoContext.Provider value={{seo, setSeo}}>
    <QueryContext.Provider value={{query, setQuery}}>
    <Box>
      <SEO site={site} />
      <WatchSuperChats notices={notices} />
      <StreamIndex />
    </Box>
    </QueryContext.Provider>
    </SeoContext.Provider>
  )
}

export default WatchPage
