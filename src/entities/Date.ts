class DateBase extends Date {
  protected twoDigit(num: number): string {
    return ("0" + num).slice(-2);
  }
}

export class CustomDate extends DateBase {
  getDisplayDateTime(): string {
    return `${this.getFullYear()}年${this.twoDigit(this.getMonth() + 1)}月${this.twoDigit(this.getDate())}日 ${this.twoDigit(this.getHours())}:${this.twoDigit(this.getMinutes())}`;
  }

  getDisplayDate(): string {
    return `${this.getFullYear()}年${this.twoDigit(this.getMonth() + 1)}月${this.twoDigit(this.getDate())}日`;
  }

  getDisplayMonth(): string {
    return `${this.getFullYear()}年${this.twoDigit(this.getMonth() + 1)}月`;
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
}
