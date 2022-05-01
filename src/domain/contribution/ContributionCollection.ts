import { ContributionsCollection } from "../../@types/type";

export class Contribution {
  private _value: ContributionsCollection;

  constructor(contributionsCollection: ContributionsCollection) {
    this._value = contributionsCollection;
  }

  countToday() {
    const contributionCalendar = this._value.contributionCalendar;
    const weeks = contributionCalendar.weeks;
    const contributionsToday =
      weeks[weeks.length - 1].contributionDays[new Date().getDay()];

    return contributionsToday.contributionCount;
  }

  countYesterday() {
    const contributionCalendar = this._value.contributionCalendar;
    const weeks = contributionCalendar.weeks;

    // 日曜日の場合、先週の土曜日のコントリビューションを取得する
    if (new Date().getDay() == 0) {
      const contributionYesterday = weeks[weeks.length - 2].contributionDays[6];

      return contributionYesterday.contributionCount;
    }
  }

  countThisWeek() {
    const contributionCalendar = this._value.contributionCalendar;
    const weeks = contributionCalendar.weeks;
    const contributionThisWeek = weeks[weeks.length - 1];
    const contributionCountThisWeek =
      contributionThisWeek.contributionDays.reduce((sum, contributionsDay) => {
        return sum + contributionsDay.contributionCount;
      }, 0);

    return contributionCountThisWeek;
  }

  countLastWeek() {
    const contributionCalendar = this._value.contributionCalendar;
    const weeks = contributionCalendar.weeks;
    const contributionLastWeek = weeks[weeks.length - 2];
    const contributionCountLastWeek =
      contributionLastWeek.contributionDays.reduce((sum, contributionsDay) => {
        return sum + contributionsDay.contributionCount;
      }, 0);

    return contributionCountLastWeek;
  }

  isZeroContributionToday(): boolean {
    return this.isZeroContribution(this.countToday());
  }

  isZeroContribution(contributionCount: number): boolean {
    return contributionCount == 0;
  }
}
