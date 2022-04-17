import "cross-fetch/polyfill"; // グローバルな fetch 関数を定義する
import { apolloClient } from "./infrastructure/githubApi";
import { githubContributionsQuery } from "./infrastructure/contributionsQuery";
import { ApolloError } from "@apollo/client/errors";

// クエリを発行
apolloClient
  .query({
    query: githubContributionsQuery,
    variables: { userName: "TheSelfAtu" },
  })
  .then((result) => handleApolloResult(result.data))
  .catch(handleApolloError);

// GraphQL レスポンスをハンドル
function handleApolloResult(data: any) {
  console.log(
    "query result",
    data,
    data.user.contributionsCollection.contributionCalendar.weeks
  );

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
  console.log(contributionCountThisDay);
}

// GraphQL のエラーをハンドル
function handleApolloError(err: ApolloError) {
  console.error(err.message);
}
