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
          defaultImage: defaultImage
        }
      }
    }
  `)

  createPage({
    path: `/`,
    component: require.resolve("./src/components/templates/HomePage.tsx"),
    context: {
      site: site.data.site
    }
  })

  createPage({
    path: `/hololive`,
    component: require.resolve("./src/components/templates/HololivePage.tsx"),
    context: {
      site: site.data.site
    }
  })

  createPage({
    path: `/nijisanji`,
    component: require.resolve("./src/components/templates/NijisanjiPage.tsx"),
    context: {
      site: site.data.site
    }
  })

  createPage({
    path: `/ranking`,
    component: require.resolve("./src/components/templates/RankingPage.tsx"),
    context: {
      site: site.data.site
    }
  })

  createPage({
    path: `/ranking/daily`,
    component: require.resolve("./src/components/templates/RankingPage.tsx"),
    context: {
      site: site.data.site
    }
  })

  createPage({
    path: `/ranking/weekly`,
    component: require.resolve("./src/components/templates/RankingWeeklyPage.tsx"),
    context: {
      site: site.data.site
    }
  })
}