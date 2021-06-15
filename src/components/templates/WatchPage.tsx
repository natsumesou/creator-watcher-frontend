import { Box } from '@material-ui/core'
import React, { createContext, useContext, useState } from 'react'
import SEO from '@/components/SEO';
import { useLocation } from "@reach/router"
import { parse } from "query-string"
import { WatchSuperChats } from '../organisms/WatchSuperChats';

export type Query = {
  cid: string,
  vid: string,
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

const WatchPage = ({ pageContext }) => {
  const { site } = pageContext;
  const location = useLocation();
  const params = parse(location.search) as {vid: string, cid: string};
  const [query, setQuery] = useState<Query>({vid: params.vid, cid: params.cid});
  const notices = [
    "アーカイブで取得できないスパチャはカウントされません",
    "同額の場合はスパチャ回数が少ないものが優先されます"
  ]

  return (
    <QueryContext.Provider value={{query, setQuery}}>
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="配信詳細" />
      <WatchSuperChats notices={notices} />
    </Box>
    </QueryContext.Provider>
  )
}

export default WatchPage
