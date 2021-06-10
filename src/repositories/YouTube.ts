import { Stream } from "../entities/Stream";

const CATEGORY = {
  hololive: 'hololive',
} as const;
export type CATEGORY = typeof CATEGORY[keyof typeof CATEGORY];

const URL = {
  hololive: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRqZ2zoqc4Gg8MoBOQO5CQk0AxB1em6K0adxNCiZA-tXjUJoZUgWCTHejCmSgEWbmF4MLYMWdpohRL/pub?output=tsv',
}

export class YouTube {
  async fetchTimeline(category: CATEGORY): Promise<Stream[]> {
    const response = await fetch(this.freshURL(URL[category]));
    const str = await response.text();
    const lines = str.split("\r\n");
    const streams = lines.map((line) => {
      const columns = line.split("\t");
      return {
        title: columns[0],
        chatCount: columns[1],
        superChatAmount: columns[2],
        memberCount: columns[3],
        channelTitle: columns[4],
        id: columns[5],
        thumbnail: `https://i.ytimg.com/vi/${columns[5]}/maxresdefault.jpg`,
        link: `https://www.youtube.com/watch?v=${columns[5]}`,
      } ;
    });
    return streams;
  }

  private freshURL(url: string) {
    return url + "&_=" + new Date().getTime();
  }
}