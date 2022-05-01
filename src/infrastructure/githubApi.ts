import {
  ApolloClient,
  ApolloError,
  InMemoryCache,
  gql,
  DocumentNode,
  TypedDocumentNode,
} from "@apollo/client/core";
import "cross-fetch/polyfill"; // グローバルな fetch 関数を定義する
import * as dotenv from "dotenv";
import { githubContributionsQuery } from "../infrastructure/contributionsQuery";
import { handleApolloError } from "../handler/error/handleError";
import { GithubResponse } from "../@types/type";

// .env ファイルの内容を環境変数に反映
dotenv.config();

const token = process.env.MYAPP_GITHUB_TOKEN;
if (typeof token === "undefined") {
  throw new Error("MYAPP_GITHUB_TOKEN cannot be found");
}

// GraphQL クライアントを生成
export const apolloClient = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: { authorization: `Bearer ${token}` },
  cache: new InMemoryCache(),
});

const fetchGithubResponse = (
  query:
    | DocumentNode
    | TypedDocumentNode<
        any,
        {
          userName: string;
        }
      >
): Promise<GithubResponse> => {
  const githubResponse = apolloClient
    .query({
      query: query,
      variables: { userName: "TheSelfAtu" },
    })
    .then((result) => {
      return result.data;
    })
    .catch(handleApolloError);
  return githubResponse;
};

export const fetchContributions = (): Promise<GithubResponse> => {
  return fetchGithubResponse(githubContributionsQuery);
};

// export const fetchContributions = (): Promise<GithubResponse> => {
//   return fetchGithubResponse(githubContributionsQuery);
// };
