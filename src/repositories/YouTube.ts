import { CustomDate } from "@/entities/Date";
import { Archive, Channel, Stream, SuperChat, SuperChats } from "../entities/entity";

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
  monthly: 'monthly',
} as const;
export type RANGE = typeof RANGE[keyof typeof RANGE];

const URL = {
  archive: "https://storage.googleapis.com/vtuber.ytubelab.com/ranking/index.tsv",
  all: {
    timeline: 'https://storage.googleapis.com/vtuber.ytubelab.com/all-timeline.tsv',
    ranking: {
      daily: {
        default: 'https://storage.googleapis.com/vtuber.ytubelab.com/daily-ranking.tsv',
        time: 'https://storage.googleapis.com/vtuber.ytubelab.com/ranking/daily/',
      },
      weekly: {
        default: 'https://storage.googleapis.com/vtuber.ytubelab.com/weekly-ranking.tsv',
        time: 'https://storage.googleapis.com/vtuber.ytubelab.com/ranking/weekly/',
      },
      monthly: {
        default: 'https://storage.googleapis.com/vtuber.ytubelab.com/monthly-ranking.tsv',
        time: 'https://storage.googleapis.com/vtuber.ytubelab.com/ranking/monthly/',
      }
    }
  },
  hololive: {
    timeline: 'https://storage.googleapis.com/vtuber.ytubelab.com/hololive-timeline.tsv',
  },
  nijisanji: {
    timeline: 'https://storage.googleapis.com/vtuber.ytubelab.com/nijisanji-timeline.tsv',
  },
  channel: {
    weeklySuperChats: 'https://storage.googleapis.com/vtuber.ytubelab.com/channels/channel_id/superChats-weekly.tsv',
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

  async fetchChannelSuperChats(channelId: string) {
    const url = this.freshURL(URL.channel.weeklySuperChats.replace('channel_id', channelId));
    const response = await fetch(url);
    if (response.status >= 400) {
      throw new Error(`HTTPリクエストエラー / ${channelId} superChats / [${response.status}]: ${url}`);
    }
    const text = await response.text();
    return this.parseSuperChats(text);
  }

  async fetchRanking(category: CATEGORY, range: RANGE, time?: string) {
    const url = time ? URL[category]["ranking"][range].time + time + ".tsv" : URL[category]["ranking"][range].default;
    const urlWithNoCache = this.freshURL(url);
    const response = await fetch(urlWithNoCache);
    if (response.status >= 400) {
      throw new Error(`HTTPリクエストエラー / ${category}-ranking / [${response.status}]: ${url}`);
    }
    const text = await response.text();
    return this.parseRanking(text);
  }

  async fetchRankingIndex() {
    const urlWithNoCache = this.freshURL(URL.archive);
    const response = await fetch(urlWithNoCache);
    if (response.status >= 400) {
      throw new Error(`HTTPリクエストエラー / ${urlWithNoCache}`);
    }
    const text = await response.text();
    return this.parseRankingIndex(text);
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
        status: columns[6],
        publishedAt: new CustomDate(parseInt(columns[7]+"000")),
      } as Stream;
    });
    return streams;
  }

  private parseSuperChats(text: string) {
    const lines = text.split("\r\n");
    const dateinfo = lines.shift();
    const meta = dateinfo.split("\t");
    const channelName = meta[0];
    const date = meta[1];
    const superChats = lines.map((line) => {
      const columns = line.split("\t");
      return {
        supporterChannelId: columns[0],
        supporterDisplayName: columns[1],
        totalAmount: columns[2],
        thumbnail: columns[3],
      } as SuperChat;
    });
    return {
      channelName: channelName,
      startAt: date,
      superChats: superChats,
    } as SuperChats;
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

  private parseRankingIndex(text: string) {
    const lines = text.split("\r\n");
    const index = lines.reduce((archive, line, i) => {
      const indexes = line.split("\t");
      switch(i) {
        case 0:
          archive.daily = indexes.filter(i => i !== "");
          break;
        case 1:
          archive.weekly = indexes.filter(i => i !== "");
          break;
        case 2:
          archive.monthly = indexes.filter(i => i !== "");
          break;
      }
      return archive;
    }, {} as Archive);
    return index;
  }

  private freshURL(url: string) {
    if (url.includes("?")) {
      return url + "&_=" + new Date().getTime();
    } else {
      return url + "?_=" + new Date().getTime();
    }
  }
}