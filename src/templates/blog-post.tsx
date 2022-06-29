import { MDXProvider } from "@mdx-js/react";
import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import * as React from "react";

import BlogPage from "../components/blogpage";
import Gallery from "../components/gallery";

type ArrayNonNull<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[]
    ? NonNullable<ElementType>[]
    : never;

function getImages(data: Queries.BlogPostQuery) {
  const images = data.allFile.edges.map((edge) => edge.node.childImageSharp);
  return images as ArrayNonNull<typeof images>;
}

// const BlogPost = ({ data, pageContext }: PageProps<{mdx: Queries.Mdx}>) => {
const BlogPost = ({ data, pageContext }: PageProps<Queries.BlogPostQuery>) => {
  // console.log('$$$$$$: ' + JSON.stringify(pageContext));

  //   const images = data.allFile.edges.map((edge) => edge.node.childImageSharp);
  //   type x = ArrayNonNull<typeof images>;

  const images = getImages(data);

  const shortcodes = { Gallery };
  return (
    <div>
      xxx JSON.stringify(pageContext) yyy
      <BlogPage>
        {/* <pre>{JSON.stringify(images, null, 2)}</pre> */}
        <p>end</p>
        <MDXProvider components={shortcodes}>
          <MDXRenderer
            pageContext={{...pageContext, images}}
            relativeDirectory={data.mdx!.parent!.relativeDirectory}
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
