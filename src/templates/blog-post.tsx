import { MDXProvider } from "@mdx-js/react";
import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import * as React from "react";

import BlogPage from "../components/blogpage";
import Gallery from "../components/gallery";

const BlogPost = ({ data, pageContext }: PageProps<Queries.BlogPostQuery>) => {
  const galleries = data.mdx?.frontmatter?.galleries;

  const shortcodes = { Gallery };
  return (
    <div>
      <BlogPage>
        <h1>{data.mdx?.frontmatter?.title}</h1>
        <MDXProvider components={shortcodes}>
          <MDXRenderer pageContext={{ ...pageContext, galleries }}>
            {data.mdx!.body}
          </MDXRenderer>
        </MDXProvider>
      </BlogPage>
    </div>
  );
};

export const query = graphql`
  query BlogPost($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        galleries {
          contents {
            scale
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
                original {
                  height
                  width
                  src
                }
              }
            }
          }
        }
      }
      body
    }
  }
`;

export default BlogPost;
