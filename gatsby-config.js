const myCustomQueries = {
  sm: '(max-width: 600px)',
};

module.exports = {
  siteMetadata: {
    title: 'VTuberスパチャ🥇ランキング',
    description: 'にじさんじ・ホロライブ等VTuberのスーパーチャットを動画別・チャンネル別・ユーザー別で一覧できます',
    author: 'YouTube研究所',
    siteUrl: 'https://vtuber.ytubelab.com',
    siteLogo: 'https://vtuber.ytubelab.com/images/logo.png',
    defaultImage: 'https://vtuber.ytubelab.com/images/share.png', // google driveに画像を上げてる・GASで毎日中身更新運用
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    `gatsby-plugin-sharp`,
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-breakpoints`,
      options: {
        queries: myCustomQueries,
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        disableAutoprefixing: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-T6VS48M",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        routeChangeEventName: "gatsby-route-change",
      },
    },
  ],
}
