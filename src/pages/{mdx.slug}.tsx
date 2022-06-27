import { MDXProvider } from '@mdx-js/react';
import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import * as React from 'react';

import BlogPage from '../components/blogpage';

const BlogPost = ({ data }: PageProps<{mdx: Queries.Mdx}>) => {
    const shortcodes = {};
    return (
        <div>
            <BlogPage>
                <h1>{data.mdx.frontmatter!.title}</h1>
                <p>{data.mdx.frontmatter!.date}</p>
                <MDXProvider components={shortcodes}>
                    <MDXRenderer>
                        {data.mdx.body}
                    </MDXRenderer>
                </MDXProvider>
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