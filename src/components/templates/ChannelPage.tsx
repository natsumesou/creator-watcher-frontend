import { Box } from '@material-ui/core'
import React, { createContext, useContext, useState } from 'react'
import SEO from '@/components/SEO';
import { SuperChats } from '../organisms/SuperChats';
import { useLocation, globalHistory } from "@reach/router"
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
    "チャンネルごとの週間スパチャ上位者を集計してます",
    "毎週月曜の朝9時過ぎに前週分のスパチャ金額を集計しています"
  ]

  return (
    <ChannelIdContext.Provider value={{channelId, setChannelId}}>
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="チャンネル" />
      <SuperChats notices={notices} />
    </Box>
    </ChannelIdContext.Provider>
  )
}

export default ChannelPage
