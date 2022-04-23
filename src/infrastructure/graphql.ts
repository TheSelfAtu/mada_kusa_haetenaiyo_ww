import { graphql } from '@octokit/graphql';
import * as dotenv from 'dotenv';

// .env ファイルの内容を環境変数に反映
dotenv.config();

// graphql をアクセストークン付きで呼び出せるようにする
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.MYAPP_GITHUB_TOKEN}`,
  },
});

export { graphqlWithAuth as graphql };