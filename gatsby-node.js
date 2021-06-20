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

  createPage({
    path: `/`,
    component: require.resolve("./src/components/templates/Article.tsx"),
    context: {
      site: site.data.site
    }
  })

  createPage({
    path: `/2021/05/31`,
    component: require.resolve("./src/components/templates/Article20210531.tsx"),
    context: {
      site: site.data.site
    }
  })

  createPage({
    path: `/2021/06/07`,
    component: require.resolve("./src/components/templates/Article20210607.tsx"),
    context: {
      site: site.data.site
    }
  })

  createPage({
    path: `/2021/06/14`,
    component: require.resolve("./src/components/templates/Article20210614.tsx"),
    context: {
      site: site.data.site
    }
  })

  // createPage({
  //   path: `/hololive`,
  //   component: require.resolve("./src/components/templates/HololivePage.tsx"),
  //   context: {
  //     site: site.data.site
  //   }
  // })

  // createPage({
  //   path: `/nijisanji`,
  //   component: require.resolve("./src/components/templates/NijisanjiPage.tsx"),
  //   context: {
  //     site: site.data.site
  //   }
  // })

  // createPage({
  //   path: `/user`,
  //   component: require.resolve("./src/components/templates/UserPage.tsx"),
  //   context: {
  //     site: site.data.site
  //   }
  // })

  // createPage({
  //   path: `/watch`,
  //   component: require.resolve("./src/components/templates/WatchPage.tsx"),
  //   context: {
  //     site: site.data.site
  //   }
  // })

  // createPage({
  //   path: `/channel`,
  //   component: require.resolve("./src/components/templates/ChannelPage.tsx"),
  //   context: {
  //     site: site.data.site
  //   }
  // })

  // createPage({
  //   path: `/ranking`,
  //   component: require.resolve("./src/components/templates/RankingPage.tsx"),
  //   context: {
  //     site: site.data.site
  //   }
  // })

  // createPage({
  //   path: `/ranking/daily`,
  //   component: require.resolve("./src/components/templates/RankingPage.tsx"),
  //   context: {
  //     site: site.data.site
  //   }
  // })

  // createPage({
  //   path: `/ranking/weekly`,
  //   component: require.resolve("./src/components/templates/RankingPage.tsx"),
  //   context: {
  //     site: site.data.site
  //   }
  // })

  // createPage({
  //   path: `/ranking/monthly`,
  //   component: require.resolve("./src/components/templates/RankingPage.tsx"),
  //   context: {
  //     site: site.data.site
  //   }
  // })

  // createPage({
  //   path: `/ranking/archive`,
  //   component: require.resolve("./src/components/templates/ArchivePage.tsx"),
  //   context: {
  //     site: site.data.site
  //   }
  // })
}