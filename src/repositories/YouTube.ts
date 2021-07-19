import { CustomDate } from "@/entities/Date";
import { Archive, Channel, ChannelMeta, Stream, StreamMeta, SuperChat, SuperChatByChannels, SuperChats, User } from "../entities/entity";

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

export class NotFoundError extends Error {};

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
    monthlySuperChats: 'https://storage.googleapis.com/vtuber.ytubelab.com/channels/channel_id/superChats-monthly.tsv',
    videoIndex: 'https://storage.googleapis.com/vtuber.ytubelab.com/channels/group_id/channelsIndex.tsv',
    channelIndex: 'https://storage.googleapis.com/vtuber.ytubelab.com/channelIndex.tsv',
  },
  video: {
    superChats: 'https://storage.googleapis.com/vtuber.ytubelab.com/channels/channel_id/video_id/superChats.tsv',
  },
  user: {
    superChats: 'https://storage.googleapis.com/vtuber.ytubelab.com/user/group_id/monthly.tsv',
  },
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

  async fetchUserSuperChats(channelId: string) {
    const groupId = this.getGroupId(channelId);
    const url = this.freshURL(URL.user.superChats.replace('group_id', groupId));
    const response = await fetch(url);
    if (response.status >= 400) {
      if (response.status === 404) {
        throw new NotFoundError(`404 / ${channelId} superChats: ${url}`);
      }
      throw new Error(`HTTPリクエストエラー / ${channelId} superChats / [${response.status}]: ${url}`);
    }
    const text = await response.text();
    return this.parseSuperChatsForUser(text, channelId);
  }

  async fetchStreamSuperChats(channelId: string, videoId: string) {
    const url = this.freshURL(URL.video.superChats.replace('channel_id', channelId).replace('video_id', videoId));
    const response = await fetch(url);
    if (response.status >= 400) {
      if (response.status === 404) {
        throw new NotFoundError(`404 / channel: ${channelId} / video: ${videoId} / superChats: ${url}`);
      }
      throw new Error(`HTTPリクエストエラー / ${channelId} / video: ${videoId} / superChats / [${response.status}]: ${url}`);
    }
    const text = await response.text();
    return this.parseSuperChatsForVideo(text);
  }

  async fetchChannelSuperChats(channelId: string) {
    const url = this.freshURL(URL.channel.monthlySuperChats.replace('channel_id', channelId));
    const response = await fetch(url);
    if (response.status >= 400) {
      if (response.status === 404) {
        throw new NotFoundError(`404 / ${channelId} superChats: ${url}`);
      }
      throw new Error(`HTTPリクエストエラー / ${channelId} superChats / [${response.status}]: ${url}`);
    }
    const text = await response.text();
    return this.parseSuperChatsForChannel(text);
  }

  async fetchVideoIndex(channelId: string) {
    const groupId = this.getGroupId(channelId);
    const url = this.freshURL(URL.channel.videoIndex.replace('group_id', groupId));
    const response = await fetch(url);
    if (response.status >= 400) {
      if (response.status == 404) {
        throw new NotFoundError(`404 / ${channelId} index: ${url}`);
      }
      throw new Error(`HTTPリクエストエラー / ${channelId} index / [${response.status}]: ${url}`);
    }
    const text = await response.text();
    return this.parseVideoIndex(text, channelId);
  }

  async fetchChannelIndex(category: string) {
    const url = URL.channel.channelIndex;
    const response = await fetch(url);
    if (response.status >= 400) {
      if (response.status == 404) {
        throw new NotFoundError(`404 / channel index: ${url}`);
      }
      throw new Error(`HTTPリクエストエラー / channel index / [${response.status}]: ${url}`);
    }
    const text = await response.text();
    return this.parseChannelIndex(text, category);
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
        meta: {
          title: columns[0],
          id: columns[5],
          channelId: columns[8],
        },
        chatCount: columns[1],
        superChatAmount: columns[2],
        memberCount: columns[3],
        channelTitle: columns[4],
        status: columns[6],
        publishedAt: new CustomDate(parseInt(columns[7]+"000")),
      } as Stream;
    });
    return streams;
  }

  private parseSuperChats(lines: string[]) {
    return lines.map((line) => {
      const columns = line.split("\t");
      const user = {
        supporterChannelId: columns[0],
        supporterDisplayName: columns[1],
        thumbnail: columns[3],
      } as User;
      return {
        user: user,
        totalAmount: columns[2],
      } as SuperChat;
    });
  }

  private parseSuperChatsForVideo(text: string) {
    const lines = text.split("\r\n");
    const dateinfo = lines.shift();
    const meta = dateinfo.split("\t");
    const title = meta[0];
    const channelName = meta[1];
    const superChatAmount = meta[2];
    const publishedAt = meta[3] ? new CustomDate(parseInt(meta[3])) : null;

    const superChats = this.parseSuperChats(lines);
    return {
      title: title,
      channelName: channelName,
      superChats: superChats,
      superChatAmount: superChatAmount,
      publishedAt: publishedAt,
    } as SuperChats;
  }

  private parseSuperChatsForChannel(text: string) {
    const lines = text.split("\r\n");
    const dateinfo = lines.shift();
    const meta = dateinfo.split("\t");
    const title = meta[0];
    const startAt = meta[1];
    const superChatAmount = meta[2];

    const superChats = this.parseSuperChats(lines);
    return {
      title: title,
      startAt: startAt,
      superChats: superChats,
      superChatAmount: superChatAmount,
    } as SuperChats;
  }

  private parseSuperChatsForUser(text: string, channelId: string) {
    const lines = text.split("\n");
    const userSuperChats = lines.reduce((result, line) => {
      const columns = line.split("\t");
      const supporterChannelId =  columns[0];
      if (supporterChannelId !== channelId) {
        return result;
      }
      const supporterDisplayName = columns[1];
      const thumbnail = columns[2]
      const targetSuperChatAmount = columns[3];
      const totalSuperChatAmount = columns[4];
      const targetChannelId = columns[5];
      const targetChannelTitle = columns[6];
      const targetChannelVideoId = columns[7];
      // 複数チャンネル分のデータが返されるので必要なものだけにフィルタする
      if (!result.user) {
        result.user = {
          supporterChannelId,
          supporterDisplayName,
          thumbnail,
        };
        result.totalAmount = totalSuperChatAmount;
      }
      // 今月は何もスパチャしていない場合、targetChannelIdが"null"で総スパチャ0円のデータが返ってくるのでresult配列には何も入れない。
      if (targetChannelId !== "null") {
        result.superChatByChannels.push({
          meta: {
            id: targetChannelId,
            title: targetChannelTitle,
          },
          superChatAmount: targetSuperChatAmount,
          videoId: targetChannelVideoId,
        });
      }
      return result;
    }, {user: null, totalAmount: null, superChatByChannels: []} as SuperChatByChannels);

    return userSuperChats;
  }

  private parseRanking(text: string) {
    const lines = text.split("\r\n");
    const streams = lines.map((line) => {
      const columns = line.split("\t");
      return {
        meta: {
          id: columns[2],
          title: columns[1],  
        },
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

  private parseVideoIndex(text: string, channelId: string) {
    const lines = text.split("\r\n");
    const index = lines.reduce((channel, line) => {
      const video = line.split("\t");
      const channelId = video[0];
      const videoId = video[1];
      const title = video[2];
      if (!channel[channelId]) {
        channel[channelId] = [];
      }
      channel[channelId].push({
        id: videoId,
        title: title,
        channelId: channelId,
      } as StreamMeta)
      return channel;
    }, {});

    return index[channelId] || [];
  }

  private parseChannelIndex(text: string, category: string) {
    const lines = text.split("\r\n");
    const index = lines.reduce((channels, line) => {
      const channel = line.split("\t");
      const channelId = channel[0];
      const channelTitle = channel[1];
      const channelCaategory = channel[2];
      if (!channels[channelCaategory]) {
        channels[channelCaategory] = [];
      }
      channels[channelCaategory].push({
        id: channelId,
        title: channelTitle,
        category: category,
      } as ChannelMeta)
      return channels;
    }, {});

    return index[category];
  }

  private freshURL(url: string) {
    if (url.includes("?")) {
      return url + "&_=" + new Date().getTime();
    } else {
      return url + "?_=" + new Date().getTime();
    }
  }

  private getGroupId(channelId: string) {
    return channelId.slice(0, 3);
  }
}