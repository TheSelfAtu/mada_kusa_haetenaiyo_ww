import { GithubResponse, ContributionsCount } from "../../@types/type";
import { postTextToSlack } from "../../infrastructure/postTextToSlack";
import { fetchContributions } from "../../infrastructure/githubApi";

// GraphQL レスポンスをハンドル

export function messageZeroContributionToday(contributionsCountToday: number) {
  if (contributionsCountToday == 0) {
    postTextToSlack("まだ草生えてないよww");
  }
}

export function messageContributionsCountToday(
  contributionsCountToday: number
) {
  const kusas = "w".repeat(contributionsCountToday);
  postTextToSlack(`今日の草は${contributionsCountToday}${kusas}`);
}

export async function getContributionsCount() {
  const githubResponse = await fetchContributions();
  const contributionsToday = getContributionCountToday(githubResponse);
  const contributionsYesterday = getContributionCountYesterday(githubResponse);
  const contributionsThisWeek = getContributionCountThisWeek(githubResponse);
  const contributionsLastWeek = getContributionCountLastWeek(githubResponse);

  return {
    contributionsToday: contributionsToday,
    contributionsYesterday: contributionsYesterday,
    contributionsThisWeek: contributionsThisWeek,
    contributionsLastWeek: contributionsLastWeek,
  };
}

export function getContributionCountToday(githubResponse: GithubResponse) {
  const contributionCalendar =
    githubResponse.user.contributionsCollection.contributionCalendar;
  const weeks = contributionCalendar.weeks;
  const contributionsToday =
    weeks[weeks.length - 1].contributionDays[new Date().getDay()];

  return contributionsToday.contributionCount;
}

export function getContributionCountYesterday(githubResponse: GithubResponse) {
  const contributionCalendar =
    githubResponse.user.contributionsCollection.contributionCalendar;
  const weeks = contributionCalendar.weeks;
  const contributionsYesterday =
    weeks[weeks.length - 1].contributionDays[new Date().getDay() - 1];

  return contributionsYesterday.contributionCount;
}

export function getContributionCountThisWeek(githubResponse: GithubResponse) {
  const contributionCalendar =
    githubResponse.user.contributionsCollection.contributionCalendar;
  const weeks = contributionCalendar.weeks;
  const contributionCountThisWeek = weeks[
    weeks.length - 1
  ].contributionDays.reduce((sum, contributionsDay) => {
    return sum + contributionsDay.contributionCount;
  }, 0);

  return contributionCountThisWeek;
}

export function getContributionCountLastWeek(githubResponse: GithubResponse) {
  const contributionCalendar =
    githubResponse.user.contributionsCollection.contributionCalendar;
  const weeks = contributionCalendar.weeks;
  const contributionCountLastWeek = weeks[
    weeks.length - 1
  ].contributionDays.reduce((sum, contributionsDay) => {
    return sum + contributionsDay.contributionCount;
  }, 0);

  return contributionCountLastWeek;
}
// ほしいコントリビューション
// ・今日
// ・昨日
// 月曜日の場合、先週の日曜のコントリビューションを取得する必要がある
// 他の曜日の場合、
// ・今週
// weeks[weeks.length - 1]のcontributionDaysをmapで回して、contributionCountをすべてたす
// ・先週
// 1週目の場合
// 先月の最終週のオブジェクトをとってくる必要がある
// それ以外の場合
// weeks[weeks.length - 2]のcontributionDaysをmapで回して、contributionCountをすべてたす
