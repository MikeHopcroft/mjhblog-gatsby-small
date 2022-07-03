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
        icon: "src/images/icon.png",
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
        path: "./src/images/",
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
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "posts",
    //     path: "./posts/",
    //   },
    //   __key: "posts",
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
      },
      __key: "posts",
    },
    // {
    //   resolve: `gatsby-plugin-mdx`,
    //   options: {
    //     gatsbyRemarkPlugins: [
    //       {
    //         resolve: `gatsby-remark-images`,
    //         options: {
    //           maxWidth: 1200,
    //         },
    //       },
    //     ],
    //   },
    // },
    // {
    //     resolve: `gatsby-transformer-remark`,
    //     options: {
    //       plugins: [
    //         {
    //           resolve: `gatsby-remark-images`,
    //           options: {
    //             // It's important to specify the maxWidth (in pixels) of
    //             // the content container as this plugin uses this as the
    //             // base for generating different widths of each image.
    //             maxWidth: 590,
    //           },
    //         },
    //       ],
    //     },
    // },    
    // {
    //     resolve: `gatsby-transformer-remark`,
    //     options: {
    //         // Footnotes mode (default: true)
    //         footnotes: true,
    //         // GitHub Flavored Markdown mode (default: true)
    //         gfm: true,
    //         // Plugins configs
    //         plugins: [],
    //     },
    // }
  ],
};

export default config;
