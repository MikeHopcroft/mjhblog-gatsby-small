import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Campervan Painter`,
    siteUrl: `https://www.campervanpainter.com`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-HVB6SRZ20F",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: `${__dirname}/content/images/icon.png`,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    `gatsby-remark-images`,
    {
        resolve: `gatsby-plugin-mdx`,
        options: {
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1200,
                showCaptions: true,
                // wrapperStyle: 'margin-bottom:10px; margin-left:10px; background: green;',
              },
            },
            {
                resolve: `gatsby-remark-figure-caption`,
            },
          ],
        },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/content/images`,
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "posts",
        path: `${__dirname}/content/posts`,
      },
      __key: "posts",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "pages",
        path: `${__dirname}/content/pages`,
      },
      __key: "pages",
    },
  ],
};

export default config;
