import * as dotenv from "dotenv";
import { chat } from "slack";
import { Message } from "../message/Message";
import { Contribution } from "../contribution/ContributionCollection";

// .env ファイルの内容を環境変数に反映
dotenv.config();

export class Slack {
  private message: Message;
  private contribution: Contribution;

  constructor(message: Message, contribution: Contribution) {
    this.message = message;
    this.contribution = contribution;
  }

  postTodayActivity() {
    if (this.contribution.isZeroContributionToday()) {
      this.postMessage(this.message.zeroContributionToday());
      return;
    }

    const contributionCount = this.contribution.countToday();
    this.postMessage(this.message.contributionCountToday(contributionCount));
  }

  postYesterdayActivity() {
    if (this.contribution.isZeroContributionToday()) {
      return;
    }

    const contributionCount = this.contribution.countYesterday();
    this.postMessage(
      this.message.contributionCountYesterday(contributionCount)
    );
  }

  postThisWeekActivity() {
    const contributionCount = this.contribution.countThisWeek();
    this.postMessage(this.message.contributionCountThisWeek(contributionCount));
  }

  postMessage(message: Message) {
    chat
      .postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: process.env.SLACK_CHANNEL,
        text: message.value,
      })
      .then((response) => {
        console.log(`チャンネルに「${message}」と投稿しました`);
      })
      .catch((error) => console.error(error));
  }
}
