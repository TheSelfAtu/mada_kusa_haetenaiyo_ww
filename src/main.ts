import cron from "node-cron";
import "cross-fetch/polyfill"; // グローバルな fetch 関数を定義する
import { Slack } from "../src/domain/slack/Slack";
import { Message } from "../src/domain/message/Message";
import { Contribution } from "../src/domain/contribution/ContributionCollection";
import { fetchContributions } from "../src/infrastructure/githubApi";
import log4js from "log4js";

function main() {
  cron.schedule("0 0 21 * * *", async () => {
    const githubResponse = await fetchContributions();
    const contribution = new Contribution(
      githubResponse.user.contributionsCollection
    );
    const message = new Message();
    const slack = new Slack(message, contribution);
    slack.postTodayActivity();
  });

  cron.schedule("0 30 7 * * *", async () => {
    const githubResponse = await fetchContributions();
    const contribution = new Contribution(
      githubResponse.user.contributionsCollection
    );
    const message = new Message();
    const slack = new Slack(message, contribution);
    slack.postYesterdayActivity();
  });

  cron.schedule("0 30 21 * * 6", async () => {
    const githubResponse = await fetchContributions();
    const contribution = new Contribution(
      githubResponse.user.contributionsCollection
    );
    const message = new Message();
    const slack = new Slack(message, contribution);
    slack.postThisWeekActivity();
  });
}

main();
