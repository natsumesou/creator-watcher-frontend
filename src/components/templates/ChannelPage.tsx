import { Box } from '@material-ui/core'
import React, { createContext, useContext, useState } from 'react'
import SEO, { SeoType, SeoContext } from '@/components/SEO';
import { ChannelSuperChats } from '../organisms/ChannelSuperChats';
import { useLocation } from "@reach/router"
import { parse } from "query-string"

type ContextType = {
  channelId: string,
  setChannelId:(channelId: string) => void
};

export const ChannelIdContext = createContext<ContextType>({
  channelId: "",
  setChannelId: () => {},
});
export const useChannelIdContext = () => useContext(ChannelIdContext);

const ChannelPage = ({ pageContext }) => {
  const { site } = pageContext;
  const location = useLocation();
  const params = parse(location.search) as {id: string};
  const [channelId, setChannelId] = useState<string>(params.id);
  const notices = [
    "毎週月曜の朝9時過ぎに前週分のスパチャ金額を集計しています",
    "スパチャ金額上位10位までを表示します。同率が複数いる場合は10位以内がすべて表示されます。"
  ]
  const [seo, setSeo] = useState<SeoType>({
    subtitle: "チャンネル",
  });

  return (
    <SeoContext.Provider value={{seo, setSeo}}>
    <ChannelIdContext.Provider value={{channelId, setChannelId}}>
    <Box>
      <SEO site={site} />
      <ChannelSuperChats notices={notices} />
    </Box>
    </ChannelIdContext.Provider>
    </SeoContext.Provider>
  )
}

export default ChannelPage
