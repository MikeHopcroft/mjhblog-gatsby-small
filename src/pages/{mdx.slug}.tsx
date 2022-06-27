import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import BlogPage from '../components/blogpage';

const BlogPost = ({ data }: PageProps<{mdx: Queries.Mdx}>) => {
    return (
        <div>
            <BlogPage>
                <p>{data.mdx.frontmatter!.date}</p>
                <MDXRenderer>
                    {data.mdx.body}
                </MDXRenderer>
            </BlogPage>
        </div>
    )
}
export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`
export default BlogPost