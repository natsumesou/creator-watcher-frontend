import { Channel, Stream } from "../entities/entity";

const CATEGORY = {
  hololive: 'hololive',
  nijisanji: 'nijisanji',
  all: 'all',
} as const;
export type CATEGORY = typeof CATEGORY[keyof typeof CATEGORY];
const DATATYPE = {
  timeline: 'timeline',
  ranking: 'ranking',
} as const;
export type DATATYPE = typeof DATATYPE[keyof typeof DATATYPE];
export const RANGE = {
  daily: 'daily',
  weekly: 'weekly',
} as const;
export type RANGE = typeof RANGE[keyof typeof RANGE];

const URL = {
  all: {
    timeline: 'https://storage.googleapis.com/vtuber.ytubelab.com/all-timeline.tsv',
    ranking: {
      daily: 'https://storage.googleapis.com/vtuber.ytubelab.com/daily-ranking.tsv',
      weekly: 'https://storage.googleapis.com/vtuber.ytubelab.com/weekly-ranking.tsv',
    }
  },
  hololive: {
    timeline: 'https://storage.googleapis.com/vtuber.ytubelab.com/hololive-timeline.tsv',
  },
  nijisanji: {
    timeline: 'https://storage.googleapis.com/vtuber.ytubelab.com/nijisanji-timeline.tsv',
  }
}

export class YouTube {
  async fetchTimeline(category: CATEGORY) {
    const url = this.freshURL(URL[category]["timeline"]);
    const response = await fetch(url);
    if (response.status >= 400) {
      throw new Error(`HTTPリクエストエラー / ${category}-timeline / [${response.status}]: ${url}`);
    }
    const text = await response.text();
    return this.parseTimeline(text);
  }

  async fetchRanking(category: CATEGORY, range: RANGE) {
    const url = this.freshURL(URL[category]["ranking"][range]);
    const response = await fetch(url);
    if (response.status >= 400) {
      throw new Error(`HTTPリクエストエラー / ${category}-ranking / [${response.status}]: ${url}`);
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
    const streams = lines.map((line) => {
      const columns = line.split("\t");
      return {
        title: columns[1],
        id: columns[2],
        superChatAmount: columns[3],
        memberCount: columns[4],
        videoId: columns[5],
      } as Channel;
    });
    return streams;
  }

  private freshURL(url: string) {
    if (url.includes("?")) {
      return url + "&_=" + new Date().getTime();
    } else {
      return url + "?_=" + new Date().getTime();
    }
  }
}