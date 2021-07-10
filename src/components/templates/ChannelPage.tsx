import { Box } from '@material-ui/core'
import React, { createContext, useContext, useState } from 'react'
import SEO, { SeoType, SeoContext } from '@/components/SEO';
import { ChannelSuperChats } from '../organisms/ChannelSuperChats';
import { useLocation } from "@reach/router"
import { parse } from "query-string"
import { StreamMeta } from '@/entities/entity';
import { StreamIndex } from '../organisms/StreamIndex';
import { QueryContext, Query } from './WatchPage';

const ChannelPage = ({ pageContext }) => {
  const { site } = pageContext;
  const location = useLocation();
  const params = parse(location.search) as {id: string};
  const [query, setQuery] = useState<Query>({cid: params.id});
  const [videoIndex, setIndex] = useState<StreamMeta[]>([]);
  const notices = [
    "今月のスパチャ金額を集計しています。毎月１日は前月の合計スパチャ額が表示されます。",
    "更新タイミングは毎日朝9時過ぎです ※リアルタイムではありません",
    "スパチャ金額は上位10位までを表示しますが、同率が複数いる場合は10位以内がすべて表示されます。",
  ]
  const [seo, setSeo] = useState<SeoType>({
    subtitle: "チャンネル",
    description: "その月のスパチャ額をチャンネル単位で集計しています(1日1回更新)",
  });

  return (
    <SeoContext.Provider value={{seo, setSeo}}>
    <QueryContext.Provider value={{query, setQuery}}>
    <Box>
      <SEO site={site} />
      <ChannelSuperChats notices={notices} />
      <StreamIndex />
    </Box>
    </QueryContext.Provider>
    </SeoContext.Provider>
  )
}

export default ChannelPage
