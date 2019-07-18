## Gatsby Source Gh Readme

## About

This GatsbyJS plugin queries GitHub's GraphQL API. It fetches the README.md file contents on the master branch of each repository and creates nodes in GatsbyJS which can be queried using GraphQL. 

The mime type for the content of these nodes is set to 'text/markdown' so that they are further processed into MarkdownRemark nodes if that functionality has been installed on your site. 

For more details about how to use this plugin see the readme file in the `packages/gatsby-source-gh-readme` folder.

## Project structure

The repository is configured as a yarn workspace (to manage packages across workspaces) and with lerna (to manage tagging and publishing to NPM)

The project repository contains two gatsby sites in the examples folder:

- gatsby-local-plugin - a gatsby site that uses the plugin code from the local repo
- gatsby-published-plugin - a gatsby site that uses the latest version of the plugin from NPM.



## Usage



1. **Just add your github keys to the site you want to use**

Create .env files to hold you secret token

    touch .env.development

and for production...

    touch .env.production

Edit these file to hold your github token

    # Github GraphQL API (Public and Private)
    GITHUB_API_TOKEN="YOUR-SECRET-TOKEN-GOES-HERE"

2. **Install the dependancies from the root**

```bash
yarn install
```

3. **Run one of the sites**

*Run the site using the latest published version of the plugin, then go to the GraphiQL interface and query for data.*

    yarn workspace gatsby-published-plugin develop

Or,

*Run the local gatsby site and edit the local package code to see the effect.*

    yarn workspace gatsby-local-plugin develop

With that you are all set to play with the plugin and queries or contribute.

## Contribute

Feel free to file an issue and then a pull request.