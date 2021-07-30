import { CustomDate } from "@/entities/Date";
import { NotFoundError } from "./YouTube";

export class Temp {
  async fetch(videoId: string) {
    const url = `https://storage.googleapis.com/vtuber.ytubelab.com/tmp/${videoId}.tsv`;
    const response = await fetch(url);
    if (response.status >= 400) {
      if (response.status === 404) {
        throw new NotFoundError(`404 / ${videoId} description`);
      }
      throw new Error(`HTTPリクエストエラー / [${response.status}]: ${url}`);
    }
    const text = await response.text();
    return text;
  }
}