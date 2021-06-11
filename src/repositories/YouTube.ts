import { Channel, Stream } from "../entities/entity";

const CATEGORY = {
  hololive: 'hololive',
  nijisanji: 'nijisanji',
  all: 'all',
} as const;
const DATATYPE = {
  timeline: 'timeline',
  ranking: 'ranking',
} as const;
export type CATEGORY = typeof CATEGORY[keyof typeof CATEGORY];
export type DATATYPE = typeof DATATYPE[keyof typeof DATATYPE];

const URL = {
  all: {
    timeline: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZQzlyob3Yd3y6Jc1G85PSn4aJZ9M8AtNILNTGHPUItzam2cEH1MIlxwTjyBXDpokSIiCsISjygZmI/pub?output=tsv',
    ranking: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5_TR6UY9wM9AQU4nhGl3X1mT1mRkqCUm9qUaa3w5xpq5zdZWTfm-1NO2tmotgOVDHAy9E0vtla2if/pub?output=tsv',
  },
  hololive: {
    timeline: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRqZ2zoqc4Gg8MoBOQO5CQk0AxB1em6K0adxNCiZA-tXjUJoZUgWCTHejCmSgEWbmF4MLYMWdpohRL/pub?output=tsv',
  },
  nijisanji: {
    timeline: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRdzWTztRUGAqQquklbWR5RpBQNM7-Tx8DOcC7Hf3SnjY1dAOZwAPqR1KFTFX_xPdm_svWwbcuSBSUN/pub?output=tsv',
  }
}

export class YouTube {
  async fetchTimeline(category: CATEGORY) {
    const response = await fetch(this.freshURL(URL[category]["timeline"]));
    if (response.status >= 300) {
      return [];
    }
    const text = await response.text();
    return this.parseTimeline(text);
  }

  async fetchRanking(category: CATEGORY) {
    const response = await fetch(this.freshURL(URL[category]["ranking"]));
    if (response.status >- 300) {
      return [];
    }
    const text = await response.text();
    return this.parseRanking(text);
  }

  private parseTimeline(text: string): Stream[] {
    const lines = text.split("\r\n");
    const streams = lines.map((line) => {
      const columns = line.split("\t");
      return {
        title: columns[0],
        chatCount: columns[1],
        superChatAmount: columns[2],
        memberCount: columns[3],
        channelTitle: columns[4],
        id: columns[5],
      } as Stream;
    });
    return streams;
  }

  private parseRanking(text: string) {
    const lines = text.split("\r\n");
    const daily = [];
    const weekly = [];
    const monthly = [];
    const streams = lines.forEach((line) => {
      const columns = line.split("\t");
      const channel = {
        title: columns[1],
        id: columns[2],
        superChatAmount: columns[3],
        memberCount: columns[4],
        videoId: columns[5],
      } as Channel;
      if (columns[0] === "daily") {
        daily.push(channel);
      } else if (columns[0] === "weekly") {
        weekly.push(channel);
      } else if (columns[0] === "monthly"){
        monthly.push(channel);
      }
    });
    return {
      daily: daily,
      weekly: weekly,
      monthly: monthly,
    };
  }

  private freshURL(url: string) {
    return url + "&_=" + new Date().getTime();
  }
}