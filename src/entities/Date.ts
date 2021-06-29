import { RANGE } from "@/repositories/YouTube";

class DateBase extends Date {
  protected static twoDigit(num: number): string {
    return ("0" + num).slice(-2);
  }
}

export class CustomDate extends DateBase {
  // Googlebotのクロールで何故かインスタンスメソッドがundefinedになるのでstaticで定義する
  static getDisplayDateTime(date: Date): string {
    return `${date.getFullYear()}年${this.twoDigit(date.getMonth() + 1)}月${this.twoDigit(date.getDate())}日 ${this.twoDigit(date.getHours())}:${this.twoDigit(date.getMinutes())}`;
  }

  static getDisplayDate(date: Date): string {
    return `${date.getFullYear()}年${this.twoDigit(date.getMonth() + 1)}月${this.twoDigit(date.getDate())}日`;
  }

  static getDisplayMonth(date: Date): string {
    return `${date.getFullYear()}年${this.twoDigit(date.getMonth() + 1)}月`;
  }

  static fromDatestring(time: string, range?: RANGE): CustomDate {
    if (time.length === 6) {
      const year = parseInt(time.substr(0,4));
      const month = parseInt(time.substr(4,2)) - 1;
      return new CustomDate(year, month);
    } else if (time.length === 8) {
      const year = parseInt(time.substr(0,4));
      const month = parseInt(time.substr(4,2)) - 1;
      const day = parseInt(time.substr(6,2));
      const date = new CustomDate(year, month ,day);
      if (range === "weekly") {
        date.setDate(date.getDate() + 6);
      }
      return date;
    } else {
      throw new Error("unknown date format: " + time);
    }
  }
}
