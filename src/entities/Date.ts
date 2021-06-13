class DateBase extends Date {
  protected static twoDigit(num: number): string {
    return ("0" + num).slice(-2);
  }
}

export class CustomDate extends DateBase {
  getDisplayDateTime(): string {
    return `${this.getFullYear()}年${CustomDate.twoDigit(this.getMonth() + 1)}月${CustomDate.twoDigit(this.getDate())}日 ${CustomDate.twoDigit(this.getHours())}:${CustomDate.twoDigit(this.getMinutes())}`;
  }

  getDisplayDate(): string {
    return CustomDate.getDisplayDate(this);
  }

  getDisplayMonth(): string {
    return CustomDate.getDisplayMonth(this);
  }

  static fromDatestring(time: string): CustomDate {
    if (time.length === 6) {
      const year = parseInt(time.substr(0,4));
      const month = parseInt(time.substr(4,2)) - 1;
      return new CustomDate(year, month);
    } else if (time.length === 8) {
      const year = parseInt(time.substr(0,4));
      const month = parseInt(time.substr(4,2)) - 1;
      const day = parseInt(time.substr(6,2));
      return new CustomDate(year, month ,day);
    } else {
      throw new Error("unknown date format: " + time);
    }
  }

  // Googleの構造化データの取得で何故かインスタンスメソッドがundefinedになるのでstaticで定義する
  static getDisplayDate(date: Date): string {
    return `${date.getFullYear()}年${this.twoDigit(date.getMonth() + 1)}月${this.twoDigit(date.getDate())}日`;
  }

  static getDisplayMonth(date: Date): string {
    return `${date.getFullYear()}年${this.twoDigit(date.getMonth() + 1)}月`;
  }
}
