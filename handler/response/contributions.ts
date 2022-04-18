// GraphQL レスポンスをハンドル
export function handleApolloResult(data: any) {
  messageZeroContributionDay(data);
}

function messageZeroContributionDay(data: any) {
  const weekCountThisYear =
    data.user.contributionsCollection.contributionCalendar.weeks.length;
  const dayCountThisWeek =
    data.user.contributionsCollection.contributionCalendar.weeks[
      weekCountThisYear - 1
    ].contributionDays.length;

  const contributionThisDay =
    data.user.contributionsCollection.contributionCalendar.weeks[
      weekCountThisYear - 1
    ].contributionDays[dayCountThisWeek - 1];
  const contributionCountThisDay = contributionThisDay.contributionCount;
  if (contributionCountThisDay == 0) {
    console.log("まだ草生えてないよww");
  }
}
