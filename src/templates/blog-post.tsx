import { MDXProvider } from "@mdx-js/react";
import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import * as React from "react";

import BlogPage from "../components/blogpage";
import Gallery from "../components/gallery";
import Gallery2 from "../components/gallery2";

type ArrayNonNull<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[]
    ? NonNullable<ElementType>[]
    : never;

function getImages(data: Queries.BlogPostQuery) {
  const images = data.allFile.edges.map((edge) => edge.node.childImageSharp);
  return images as ArrayNonNull<typeof images>;
}

const BlogPost = ({ data, pageContext }: PageProps<Queries.BlogPostQuery>) => {
  const images = getImages(data);
  const galleries = data.mdx?.frontmatter?.galleries;

  const shortcodes = { Gallery, Gallery2 };
  return (
    <div>
      <BlogPage>
        <h1>{data.mdx?.frontmatter?.title}</h1>
        <MDXProvider components={shortcodes}>
          <MDXRenderer
            pageContext={{...pageContext, galleries, images}}
            relativeDirectory={data.mdx?.parent?.relativeDirectory}
          >
            {data.mdx!.body}
          </MDXRenderer>
        </MDXProvider>
      </BlogPage>
    </div>
  );
};

export const query = graphql`
  query BlogPost($id: String, $regex: String) {
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
      parent {
        ... on File {
          relativeDirectory
        }
      }
      body
    }
    allFile(
      filter: {
        extension: { regex: "/jpg|png/" }
        relativeDirectory: { regex: $regex }
      }
    ) {
      edges {
        node {
          id
          relativeDirectory
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export default BlogPost;
