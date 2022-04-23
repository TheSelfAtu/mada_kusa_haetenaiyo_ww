import { ApolloError } from "@apollo/client/errors";

// GraphQL のエラーをハンドル
export function handleApolloError(err: ApolloError) {
  console.error(err.message);
}
