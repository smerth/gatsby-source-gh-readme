# gatsby-source-gh-readme

A Gatsby source plugin for sourcing the `README.md` files at the root of the master branches of each of your Github repositories into your Gatsby application.

The plugin creates markdown `File` nodes from the readme file content. If `gatsby-tranformer-remark` is installed it will transform these markdown file nodes into `MarkdownRemark` nodes from which you can query an HTML representation of the markdown.

> **Nota Bene**: Currently this plugin only fetches readme files named with all caps "README.md" not "readme.md". I am looking into how to fetch both upper and lower case named readme files.

## Install

```bash
yarn add gatsby-source-gh-readme
```

or

```bash
npm install --save gatsby-source-gh-readme
```

## Usage

### Provide Github Credentials

@ github.com > account > developer settings > personal access token, create a token and give access to read data from your repositories. Choose to restrict access to only public repos if that's what you want.

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

> Note: dotenv is part of GatsbyJS so you can require it without installing it.

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

### Query for nodes

Once you have this plugin installed on your GatsbyJS site a GraphQL query to Github will pull in the readme file content and create nodes on your Gatsby data graph at GatsbyJS build time.

You will find a list of all the readme contents under `allGithubReadme`

So you can query for all readme nodes like this

```javascript
query MyQuery {
  allGithubReadme(sort: {order: ASC, fields: title}) {
    totalCount
    nodes {
      id
      title
      description
    }
  }
}
```

> If the totalCound doesn't match the number of repos on your account it may be for one of the following reasons:
>
> - some of your repos don't have a readme file on the master branch
> - the readme file may be named "readme" instead of "README"
> - you may have some private repos that will only be available if you have issued yourself a key with private permissions.

Individual nodes are found on `githubReadme`. To query for the readme of a particular repo you can try:

```javascript
query githubProjectByTitle($name: String!) {
  githubReadme(title: {eq: $name}) {
    title
    description
    readme
  }
}
```

with these query variables

```javascript
{
  "name":"REPO-NAME-GOES-HERE"
}
```

In these queries the readme content is a **blob of markdown text** in the field `readme`

### Create pages on your site

Note that MarkdownRemark must be installed on the site for the readme nodes to be processed into usable html.

Because a MarkdownRemark node is created for each githubReadme node that is added to the GatsbyJS data graph, you can get access the content you want through childMarkdownRemark.

## Contribute

Any ideas to make this more useful or stable are welome. See the github project page [gatsby-source-gh-readme](https://github.com/smerth/gatsby-source-gh-readme) for more information.

## 