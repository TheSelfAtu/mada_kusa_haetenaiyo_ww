import { GithubResponse } from "../../@types/type";
import { postTextToSlack } from "../../infrastructure/postTextToSlack";
import { fetchContributions } from "../../infrastructure/githubApi";

// GraphQL レスポンスをハンドル
export function handleApolloResult(githubResponse: GithubResponse) {
  const contributionsCountToday = getContributionsCount();
  messageZeroContributionToday(contributionsCountToday);
  messageContributionsCountToday(contributionsCountToday);
}

export function messageZeroContributionToday(contributionsCountToday: any) {
  if (contributionsCountToday == 0) {
    postTextToSlack("まだ草生えてないよww");
  }
}

export function messageContributionsCountToday(contributionsCountToday: any) {
  const kusas = "w".repeat(contributionsCountToday);
  postTextToSlack(`今日の草は${contributionsCountToday}${kusas}`);
}

export async function getContributionsCount() {
  const githubResponse = await fetchContributions();
  const contributionCalendar =
    githubResponse.user.contributionsCollection.contributionCalendar;
  const weeks = contributionCalendar.weeks;
  const date = new Date();
  const contributionsToday =
    weeks[weeks.length - 1].contributionDays[date.getDay()];
  return contributionsToday.contributionCount;
}
