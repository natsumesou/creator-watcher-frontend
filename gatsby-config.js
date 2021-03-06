const myCustomQueries = {
  sm: '(max-width: 600px)',
};

module.exports = {
  siteMetadata: {
    title: 'VTuberã¹ããã£ð¥ã©ã³ã­ã³ã°',
    description: 'ã«ããããã»ãã­ã©ã¤ãç­VTuberã®YouTubeã«ãããã¹ã¼ãã¼ãã£ãã(ã¹ããã£ã»æãé­)ã®å©çãåç»å¥ã»ãã£ã³ãã«å¥ã»ã¦ã¼ã¶ã¼å¥ã§éè¨ãã¦è¡¨ç¤ºããã¹ããã£ã®ãªã³ã©ã¤ã³éè¨ãã¼ã«ã§ã',
    author: 'YouTubeç ç©¶æ',
    siteUrl: 'https://vtuber.ytubelab.com',
    siteLogo: 'https://vtuber.ytubelab.com/images/logo.png',
    defaultImage: 'https://vtuber.ytubelab.com/images/share.png', // google driveã«ç»åãä¸ãã¦ãã»GASã§æ¯æ¥ä¸­èº«æ´æ°éç¨
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
