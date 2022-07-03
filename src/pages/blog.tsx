import { graphql, PageProps } from "gatsby";
import * as React from "react";

import BlogPostList from "../components/blogpostlist";
import BlogPage from "../components/blogpage";

const BlogHome = (props: PageProps<Queries.BlogHomeQuery>) => {
    return (
        <BlogPage>
            <BlogPostList posts={props}/>
        </BlogPage>
    )
};

export const query = graphql`
  query BlogHomePage {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
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
    }
  }
`;

export default BlogHome;
