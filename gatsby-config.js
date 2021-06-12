const myCustomQueries = {
  sm: '(max-width: 600px)',
};

module.exports = {
  siteMetadata: {
    title: 'VTuberスパチャ💲ランキング',
    description: '配信が終了したスーパーチャットのランキングを集計します',
    author: 'YouTube研究所',
    siteUrl: 'https://vtuber.ytubelab.com',
    defaultImage: 'https://drive.google.com/uc?id=1gtcIIVuktGOKjmqSwgU5hu0PkX6eTXK9', // google driveに画像を上げてる・GASで毎日中身更新運用
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    `gatsby-plugin-sharp`,
    'gatsby-plugin-sitemap',
    'gatsby-transformer-remark',
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        sitemap: 'https://vtuber.ytubelab.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
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
