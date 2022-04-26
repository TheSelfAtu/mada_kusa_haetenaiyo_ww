import cron from "node-cron";
import "cross-fetch/polyfill"; // グローバルな fetch 関数を定義する
import {
  messageZeroContributionToday,
  messageContributionsCountToday,
  getContributionsCount,
} from "./handler/response/contributions";

function main() {
  cron.schedule("0 0 21 * * *", async () => {
    const contributionCount = await getContributionsCount();
    messageZeroContributionToday(contributionCount);
  });
  cron.schedule("0 52 21 * * *", async () => {
    const contributionCount = await getContributionsCount();
    messageContributionsCountToday(contributionCount);
  });
}

main();
