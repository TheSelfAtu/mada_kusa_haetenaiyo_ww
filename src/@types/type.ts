export interface GithubResponse {
  user: {
    __typename: "User";
    contributionsCollection: ContributionsCollection;
  };
}

export interface ContributionsCollection {
  __typename: "ContributionsCollection";
  contributionCalendar: ContributionCalendar;
}

interface ContributionCalendar {
  __typename: "ContributionCalendar";
  totalContributions: number;
  weeks: ContributionCalendarWeek[];
}

interface ContributionCalendarWeek {
  __typename: "ContributionCalendarWeek";
  contributionDays: ContributionCalendarDay[];
}

interface ContributionCalendarDay {
  __typename: "ContributionCalendarDay";
  contributionCount: number;
  date: string;
  weekday: number;
}

export interface ContributionsCount {
  contributionsToday: number;
  contributionsYesterday: number;
  contributionsThisWeek: number;
  contributionsLastWeek: number;
}
