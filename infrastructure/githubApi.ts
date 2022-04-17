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
