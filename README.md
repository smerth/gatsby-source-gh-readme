# gatsby-source-gh-readme

A Gatsby source plugin for sourcing the `README.md` files at the root of the master branches of  each of your Github repositories into your Gatsby application.

The plugin creates markdown `File` nodes from the readme file content. If `gatsby-tranformer-remark` is installed it will transform these markdown file nodes into `MarkdownRemark` nodes from which you can query an HTML representation of the markdown.



## Install

```bash
npm install --save gatsby-source-gh-readme
```



## How to use



### Provide Github Credentials

@ github.com > account > developer settings > personal access token, create a token and give access to read data from your repositories.  Choose to restrict access to only public repos if that's what you want.

Amend your `.gitignore` file to exclude `.env` files

```text
# dotenv environment variables file
.env
.env.*
.env.development
.env.production
```

Create `.env` files to hold you secret token

```bash
touch .env.development
```

and for production...

```bash
touch .env.production
```

Edit these file to hold your github token

```bash
# Github GraphQL API (Public and Private)
GITHUB_API_TOKEN="YOUR-SECRET-TOKEN-GOES-HERE"
```

Make the environment variables listed in these files available to GatsbyJS

@ `gatsby-config.js`, at the top of the file

```javascript
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});
```



### Make GatsbyJS aware of the plugin

@ `gatsby-config.js`, add the plugin

```javascript
  plugins: [
    {
      resolve: "gatsby-source-gh-readme",
      options: {
        gitHubToken: `${process.env.GITHUB_API_TOKEN}`
      }
    },...
```



## How to Query

You can query for the readme file content like this, where `$name` is the name of the repository.  

```graphql
export const pageQuery = graphql`
  query githubProjectByTitle($name: String!) {
    githubReadme(title: { eq: $name }) {
      childMarkdownRemark {
        timeToRead
        html
        headings {
          value
          depth
        }
      }
    }
  }
`;
```

Note that MarkdownRemark must be installed on the site for the readme nodes to be processed into usable html.  Because a MarkdownRemark node is created for each githubReadme node that is added to GatsbyJS, you can get access the content you want through childMarkdownRemark.



