import React, { useEffect, useState } from 'react'

interface Stream {
  title: string,
  chatCount: number,
  superChatCount: number,
  superChatAmount: number,
  memberCount: number,
  channelTitle: string,
  thumbnail: string,
}

export const Timeline = () => {
  const [data, setData] = useState<Stream[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vTRqZ2zoqc4Gg8MoBOQO5CQk0AxB1em6K0adxNCiZA-tXjUJoZUgWCTHejCmSgEWbmF4MLYMWdpohRL/pub?output=tsv`);
      const str = await response.text();
      const lines = str.split("\r\n");
      const streams = lines.map((line) => {
        const columns = line.split("\t");
        return {
          title: columns[0],
          chatCount: parseInt(columns[1]),
          superChatCount: parseInt(columns[2]),
          superChatAmount: parseFloat(columns[3]),
          memberCount: parseInt(columns[4]),
          channelTitle: columns[5],
          thumbnail: columns[6],
        } ;
      });
      setData(streams);
    }
    fetchData();
  }, [])

  return (
    <div>{JSON.stringify(data)}</div>
  )
}
