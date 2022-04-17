import { gql } from "@apollo/client/core";

// 発行する GraphQL クエリ
export const githubContributionsQuery = gql`
  query ($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
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
