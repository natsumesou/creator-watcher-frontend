import { CustomDate } from "@/entities/Date";

export class Temp {
  async fetch(videoId: string) {
    const url = `https://storage.googleapis.com/vtuber.ytubelab.com/tmp/${videoId}.tsv`;
    const response = await fetch(url);
    if (response.status >= 400) {
      if (response.status === 404) {
        return "";
      }
      throw new Error(`HTTPリクエストエラー / [${response.status}]: ${url}`);
    }
    const text = await response.text();
    return text;
  }
}