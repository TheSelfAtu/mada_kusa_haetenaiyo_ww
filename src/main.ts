import cron from "node-cron";
import "cross-fetch/polyfill"; // グローバルな fetch 関数を定義する
import {
  messageZeroContributionToday,
  messageContributionCountToday,
  getContributionCountToday,
  getContributionCountYesterday,
  messageContributionCountYesterday,
} from "./handler/response/contributions";
import { fetchContributions } from "./infrastructure/githubApi";

function main() {
  cron.schedule("0 0 21 * * *", async () => {
    messageZeroContributionToday();
  });

  // cron.schedule("0 30 7 * * *", async () => {
  cron.schedule("0 25 23 * * *", () => {
    messageContributionCountYesterday();
  });
}

main();
