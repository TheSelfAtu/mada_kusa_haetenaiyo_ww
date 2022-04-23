import { postTextToSlack } from "../../infrastructure/slack/postText";

// GraphQL レスポンスをハンドル
export function handleApolloResult(data: any) {
  console.log(data);
  
  // const weekCountThisYear =
  //   data.user.contributionsCollection.contributionCalendar.weeks.length;
  // const dayCountThisWeek =
  //   data.user.contributionsCollection.contributionCalendar.weeks[
  //     weekCountThisYear - 1
  //   ].contributionDays.length;

  // const contributionThisDay =
  //   data.user.contributionsCollection.contributionCalendar.weeks[
  //     weekCountThisYear - 1
  //   ].contributionDays[dayCountThisWeek - 1];
  // const contributionCountThisDay = contributionThisDay.contributionCount;
  // messageZeroContributionDay(contributionCountThisDay);
  // messageCountContributionsDay(contributionCountThisDay);
}

function messageZeroContributionDay(countContributions: any) {
  if (countContributions == 0) {
    postTextToSlack("まだ草生えてないよww");
  }
}

function messageCountContributionsDay(countContributions: any) {
  const kusas = "w".repeat(countContributions);
  postTextToSlack(`今日の草は${countContributions}${kusas}`);
}
