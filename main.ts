import "cross-fetch/polyfill"; // グローバルな fetch 関数を定義する
import { apolloClient } from "./infrastructure/githubApi";
import { githubContributionsQuery } from "./infrastructure/contributionsQuery";
import { handleApolloResult } from "./handler/response/contributions";
import { handleApolloError } from "./handler/error/handleError";

// クエリを発行
apolloClient
  .query({
    query: githubContributionsQuery,
    variables: { userName: "TheSelfAtu" },
  })
  .then((result) => handleApolloResult(result.data))
  .catch(handleApolloError);
