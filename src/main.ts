import cron from "node-cron";
import "cross-fetch/polyfill"; // グローバルな fetch 関数を定義する
import {
  messageZeroContributionToday,
  getContributionsCount,
} from "./handler/response/contributions";

async function main() {
  const contributionCount = await getContributionsCount();
  messageZeroContributionToday(contributionCount);
  // cron.schedule("1 * * * * *", () => {
  // クエリを発行

  // });
}

main();
