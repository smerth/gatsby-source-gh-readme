/* This GatsbyJS plugin queries GitHub's GraphQL API for a given user account. 
It fetches the README.md file at the root of the master branch of each repository 
and creates a MarkdownRemark node for each in GatsbyJS.
Note - gatsby-transformer-remark must be implemented in the host GatsbyJS site.
 */

const GithubGraphQLApi = require("node-github-graphql");

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;
  const gitHubToken = configOptions.gitHubToken;

  const github = new GithubGraphQLApi({
    token: gitHubToken
  });

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins;

  // Helper function that processes a repository node to match Gatsby's node structure
  const processRepo = repo => {
    const nodeId = createNodeId(`repo-readme-${repo.id}`);
    const readme = repo.readme;
    const nodeData = Object.assign({}, repo, {
      id: `repo-readme-${nodeId}`,
      parent: null,
      children: [],
      internal: {
        mediaType: "text/markdown",
        type: `GithubReadme`,
        content: readme,
        contentDigest: createContentDigest(repo)
      }
    });
    return nodeData;
  };

  // Gatsby expects sourceNodes to return a promise
  return github.query(
    `
    query {
      viewer {
        name
          repositories(first: 100) {
            edges {
              node {
                id
                name
                isPrivate
                createdAt
                updatedAt
                forkCount
                stargazers {
                  totalCount
                }
                homepageUrl
                description
                readme: object(expression: "master:README.md") {
                  ... on Blob {
                    text
                  }
                }
              }
            }
          }
        }
      }
    `,
    null,
    (res, err) => {
      const { data } = res;
      const nodes = data.viewer.repositories.edges;

      nodes.map(item => {
        if (item.node.readme) {
          const datum = {
            id: item.node.id,
            title: item.node.name,
            description: item.node.description,
            readme: item.node.readme.text
          };
          const nodeData = processRepo(datum);

          createNode(nodeData);
        }
      });
    }
  ); // end github.query
}; // exports.sourceNodes
