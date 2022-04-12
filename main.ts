import {
  ApolloClient,
  ApolloError,
  InMemoryCache,
  gql,
} from "@apollo/client/core";
import "cross-fetch/polyfill"; // グローバルな fetch 関数を定義する
import * as dotenv from "dotenv";

// .env ファイルの内容を環境変数に反映
dotenv.config();

// const token = 'a4304a13bc6cdd52509c90a38a676fce962ce518';
const token = process.env.MYAPP_GITHUB_TOKEN;
if (typeof token === "undefined") {
  throw new Error("MYAPP_GITHUB_TOKEN cannot be found");
}

// GraphQL クライアントを生成
const apolloClient = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: { authorization: `Bearer ${token}` },
  cache: new InMemoryCache(),
});

// 発行する GraphQL クエリ

const QUERY = gql`
  query ($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

// クエリを発行
apolloClient
  .query({ query: QUERY, variables: { userName: "TheSelfAtu" } })
  .then((result) => handleApolloResult(result.data))
  .catch(handleApolloError);

// GraphQL レスポンスをハンドル
function handleApolloResult(data: any) {
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
