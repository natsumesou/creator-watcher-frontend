module.exports = {
  siteMetadata: {
    title: 'YouTube スパチャ ランキング',
    description: 'スーパーチャットのランキングをほぼリアルタイムに表示します',
    author: 'YouTube研究所',
    siteUrl: 'http://localhost:8000',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    `gatsby-plugin-sharp`,
    'gatsby-plugin-sitemap',
    'gatsby-transformer-remark',
    `gatsby-plugin-react-helmet`,
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
        id: "xxxxx",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        routeChangeEventName: "gatsby-route-change",
      },
    },
  ],
}
