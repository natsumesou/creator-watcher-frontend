module.exports = {
  siteMetadata: {
    title: 'VTuberスパチャランキング',
    description: '配信が終了したスーパーチャットのランキングを集計します',
    author: 'YouTube研究所',
    siteUrl: 'https://vtuber.ytubelab.com',
    defaultImage: '/images/logo.png',
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
