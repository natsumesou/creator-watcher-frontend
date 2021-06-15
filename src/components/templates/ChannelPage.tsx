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

  return (
    <ChannelIdContext.Provider value={{channelId, setChannelId}}>
    <Box>
      <SEO siteMetadata={site.siteMetadata} subtitle="チャンネル" />
      <SuperChats />
    </Box>
    </ChannelIdContext.Provider>
  )
}

export default ChannelPage
