export class Message {
  private _message: string;

  constructor(_message: string = "") {
    this._message = _message;
  }

  get value() {
    return this._message;
  }

  zeroContributionToday() {
    return new Message("まだ草生えてないよww");
  }

  contributionCountToday(contributionCount: number) {
    const kusas = "w".repeat(contributionCount);

    return new Message(`今日の草は${contributionCount}${kusas}`);
  }

  contributionCountYesterday(contributionCount: number) {
    const kusas = "w".repeat(contributionCount);

    return new Message(`昨日の草は${contributionCount}${kusas}`);
  }

  contributionCountThisWeek(contributionCount: number) {
    const kusas = "w".repeat(contributionCount);

    return new Message(`今週の草は${contributionCount}${kusas}`);
  }
}
