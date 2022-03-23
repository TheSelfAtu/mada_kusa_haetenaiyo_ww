import { graphql } from './graphql';

// const QUERY = `
//   {
//     repository(owner: "octokit", name: "graphql.js") {
//       issues(last: 3, states: [OPEN]) {
//         edges {
//           node {
//             number
//             title
//           }
//         }
//       }
//     }
//   }
// `;
const QUERY = `
query($userName:String!) {
    user(login: $userName){
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
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

async function main() {
  try {
    const {repository} = await graphql(QUERY,{userName: 'TheSelfAtu'});
    console.log(repository,"repoo");
    
    // for (const {node: issue} of repository.issues.edges) {
    //   console.log(`* ${issue.number}: ${issue.title}`);
    // }
  } catch (err) {
    // console.error("err");
    console.error(err);
  }
}

main();