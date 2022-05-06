import cron from "node-cron";
import { chat } from "slack";
import { Message } from "../message/Message";
import { Contribution } from "../contribution/ContributionCollection";
import { Slack } from "../slack/Slack";
import { fetchContributions } from "../../infrastructure/githubApi";

interface cronTime {
  second: string;
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export class Notification {
  private _time: cronTime;
  constructor(time: cronTime) {
    this._time = time;
  }

  async scheduledNotification() {
    const second = this._time.second;
    const minute = this._time.minute;
    const hour = this._time.hour;
    const dayOfMonth = this._time.dayOfMonth;
    const month = this._time.month;
    const dayOfWeek = this._time.dayOfMonth;

    cron.schedule(
      `${second} ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`,
      async () => {
        const githubResponse = await fetchContributions();
        const contribution = new Contribution(
          githubResponse.user.contributionsCollection
        );
        const message = new Message();
        const slack = new Slack(message, contribution);
        slack.postTodayActivity();
      }
    );
  }
}
