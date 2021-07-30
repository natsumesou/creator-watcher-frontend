const path = require('path')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsConfigPathsPlugin()],
    },
  });

  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /lazysizes/,
            use: loaders.null(),
          },
        ],
      },
    })
  }

}

exports.createPages = async ({ graphql, actions: { createPage }}) => {
  const site = await graphql(`
    query SEO {
      site {
        siteMetadata {
          title: title
          description: description
          siteUrl: siteUrl
          siteLogo: siteLogo
          defaultImage: defaultImage
          author: author
        }
      }
    }
  `)

  const context = {
    site: site.data.site,
    buildTimestamp: new Date().getTime(),
  };

  createPage({
    path: `/`,
    component: require.resolve("./src/components/templates/HomePage.tsx"),
    context: context,
  })

  createPage({
    path: `/hololive`,
    component: require.resolve("./src/components/templates/HololivePage.tsx"),
    context: context,
  })

  createPage({
    path: `/nijisanji`,
    component: require.resolve("./src/components/templates/NijisanjiPage.tsx"),
    context: context,
  })

  createPage({
    path: `/user`,
    component: require.resolve("./src/components/templates/UserPage.tsx"),
    context: context,
  })

  createPage({
    path: `/watch`,
    component: require.resolve("./src/components/templates/WatchPage.tsx"),
    context: context,
  })

  createPage({
    path: `/channel`,
    component: require.resolve("./src/components/templates/ChannelPage.tsx"),
    context: context,
  })

  createPage({
    path: `/ranking`,
    component: require.resolve("./src/components/templates/RankingPage.tsx"),
    context: context,
  })

  createPage({
    path: `/ranking/daily`,
    component: require.resolve("./src/components/templates/RankingPage.tsx"),
    context: context,
  })

  createPage({
    path: `/ranking/weekly`,
    component: require.resolve("./src/components/templates/RankingPage.tsx"),
    context: context,
  })

  createPage({
    path: `/ranking/monthly`,
    component: require.resolve("./src/components/templates/RankingPage.tsx"),
    context: context,
  })

  createPage({
    path: `/ranking/archive`,
    component: require.resolve("./src/components/templates/ArchivePage.tsx"),
    context: context,
  })
}