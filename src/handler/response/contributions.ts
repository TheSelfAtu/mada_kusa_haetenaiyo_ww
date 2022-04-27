import { GithubResponse, ContributionsCount } from "../../@types/type";
import { postTextToSlack } from "../../infrastructure/postTextToSlack";
import { fetchContributions } from "../../infrastructure/githubApi";

// GraphQL レスポンスをハンドル

export async function messageZeroContributionToday() {
  const githubResponse = await fetchContributions();
  const contributionCountToday = getContributionCountToday(githubResponse);

  if (contributionCountToday == 0) {
    postTextToSlack("まだ草生えてないよww");
  }
}

export async function messageContributionCountToday() {
  const githubResponse = await fetchContributions();
  const contributionCountToday = getContributionCountToday(githubResponse);
  const kusas = "w".repeat(contributionCountToday);
  postTextToSlack(`今日の草は${contributionCountToday}${kusas}`);
}

export async function messageContributionCountYesterday() {
  const githubResponse = await fetchContributions();
  const contributionCountYesterday =
    getContributionCountYesterday(githubResponse);

  const kusas = "w".repeat(contributionCountYesterday);
  postTextToSlack(`昨日の草は${contributionCountYesterday}${kusas}`);
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

  // 日曜日の場合、先週の土曜日のコントリビューションを取得する
  if (new Date().getDay() == 0) {
    const contributionYesterday = weeks[weeks.length - 2].contributionDays[6];

    return contributionYesterday.contributionCount;
  }

  const contributionYesterday =
    weeks[weeks.length - 1].contributionDays[new Date().getDay() - 1];

  return contributionYesterday.contributionCount;
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
