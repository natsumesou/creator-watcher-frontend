import { Channel, Stream } from "../entities/entity";

const CATEGORY = {
  hololive: 'hololive',
} as const;
const DATATYPE = {
  timeline: 'timeline',
  ranking: 'ranking',
} as const;
export type CATEGORY = typeof CATEGORY[keyof typeof CATEGORY];
export type DATATYPE = typeof DATATYPE[keyof typeof DATATYPE];

const URL = {
  hololive: {
    timeline: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRqZ2zoqc4Gg8MoBOQO5CQk0AxB1em6K0adxNCiZA-tXjUJoZUgWCTHejCmSgEWbmF4MLYMWdpohRL/pub?output=tsv',
    ranking: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFlCFz9P5V1IKqaKjOmV3CC-ibBsrMfZlRE2qrJfGWQQBqUgEro996s2G84CA4WOH4UuUPULTOltWM/pub?output=tsv',
  }
}

export class YouTube {
  async fetchTimeline(category: CATEGORY) {
    const response = await fetch(this.freshURL(URL[category]["timeline"]));
    const text = await response.text();
    return this.parseTimeline(text);
  }

  async fetchRanking(category: CATEGORY) {
    const response = await fetch(this.freshURL(URL[category]["ranking"]));
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
        thumbnail: this.thumbnailURL(columns[5]),
        link: `https://www.youtube.com/watch?v=${columns[5]}`,
      } as Stream;
    });
    return streams;
  }

  private parseRanking(text: string) {
    const lines = text.split("\r\n");
    const weekly = [];
    const monthly = [];
    const streams = lines.forEach((line) => {
      const columns = line.split("\t");
      const channel = {
        title: columns[1],
        id: columns[2],
        superChatAmount: columns[3],
        memberCount: columns[4],
        thumbnail: this.thumbnailURL(columns[5]),
        link: `https://www.youtube.com/channel/${columns[2]}`,
      } as Channel;
      if (columns[0] === "weekly") {
        weekly.push(channel);
      } else {
        monthly.push(channel);
      }
    });
    return {
      weekly: weekly,
      monthly: monthly,
    };
  }
  private thumbnailURL(videoId: string) {
    return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  }

  private freshURL(url: string) {
    return url + "&_=" + new Date().getTime();
  }
}