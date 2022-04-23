import * as dotenv from "dotenv";
import { chat } from "slack";

// .env ファイルの内容を環境変数に反映
dotenv.config();

export const postTextToSlack = (text: string) => {
  chat
    .postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.SLACK_CHANNEL,
      text: text,
    })
    .then((response) => {
      console.log(response.data);
    });
};
