import { graphql } from "gatsby";

export const blogPostInfoFragment = graphql`
  fragment BlogPostInfoFragment on Mdx {
    frontmatter {
      title
      date
      hero_image {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    excerpt
    id
    body
    slug
  }
`;

export const query = graphql`
  query BlogPostInfo {
    allMdx {
      nodes {
        ...BlogPostInfoFragment
      }
    }
  }
`;

export type BlogPostInfo = Queries.BlogPostInfoQuery['allMdx']['nodes'][number];
