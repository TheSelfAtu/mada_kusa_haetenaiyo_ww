import { GithubResponse } from "../../@types/type";
import { postTextToSlack } from "../../infrastructure/postTextToSlack";

// GraphQL レスポンスをハンドル
export function handleApolloResult(githubResponse: GithubResponse) {
  const contributionsCountToday = getContributionsCountToday(githubResponse);
  messageZeroContributionDay(contributionsCountToday);
  messageContributionsCountDay(contributionsCountToday);
}

function messageZeroContributionDay(contributionsCountToday: any) {
  if (contributionsCountToday == 0) {
    postTextToSlack("まだ草生えてないよww");
  }
}

function messageContributionsCountDay(contributionsCountToday: any) {
  const kusas = "w".repeat(contributionsCountToday);
  postTextToSlack(`今日の草は${contributionsCountToday}${kusas}`);
}

function getContributionsCountToday(githubResponse: GithubResponse) {
  const contributionCalendar =
    githubResponse.user.contributionsCollection.contributionCalendar;
  const weeks = contributionCalendar.weeks;
  const date = new Date();
  const contributionsToday =
    weeks[weeks.length - 1].contributionDays[date.getDay()];
  return contributionsToday.contributionCount;
}
