import { Box } from '@material-ui/core'
import React, { useState } from 'react'
import SEO, { SeoType, SeoContext } from '@/components/SEO';
import { UserSuperChats } from '../organisms/UserSuperChats';
import { useLocation } from "@reach/router"
import { parse } from "query-string"
import { ChannelIdContext } from './ChannelPage';

const UserPage = ({ pageContext }) => {
  const { site } = pageContext;
  const location = useLocation();
  const params = parse(location.search) as {id: string};
  const [channelId, setChannelId] = useState<string>(params.id);
  const notices = [
    "毎日朝9時過ぎに今月のスパチャ金額を集計しています",
    "毎月１日は前月の合計スパチャ額が表示されます",
  ]
  const [seo, setSeo] = useState<SeoType>({
    subtitle: "ユーザーページ",
  });

  return (
    <SeoContext.Provider value={{seo, setSeo}}>
    <ChannelIdContext.Provider value={{channelId, setChannelId}}>
    <Box>
      <SEO site={site} />
      <UserSuperChats notices={notices} />
    </Box>
    </ChannelIdContext.Provider>
    </SeoContext.Provider>
  )
}

export default UserPage
