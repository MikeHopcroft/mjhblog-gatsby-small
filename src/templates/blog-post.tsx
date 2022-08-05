import {MDXProvider} from '@mdx-js/react';
import {graphql, PageProps} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import * as React from 'react';

import BlogPage from '../components/blogpage';
import Gallery2 from '../components/gallery2';
import Image from '../components/image';
import OtherPage from '../components/otherpage';

const BlogPost = ({data, pageContext}: PageProps<Queries.BlogPostQuery>) => {
  const galleries = data.mdx?.frontmatter?.galleries;
  const shortcodes = {Gallery2, Image};

  if (data.mdx?.frontmatter?.type !== null) {
    return (
      <OtherPage>
        <MDXProvider components={shortcodes}>
          <MDXRenderer pageContext={{...pageContext, galleries}}>
            {data.mdx!.body}
          </MDXRenderer>
        </MDXProvider>
      </OtherPage>
    );
  } else {
    return (
      <BlogPage>
        <h1>{data.mdx?.frontmatter?.title}</h1>
        <div className="widget-title">
          Posted on {data.mdx?.frontmatter?.date}
        </div>
        <MDXProvider components={shortcodes}>
          <MDXRenderer pageContext={{...pageContext, galleries}}>
            {data.mdx!.body}
          </MDXRenderer>
        </MDXProvider>
      </BlogPage>
    );
  }
};

export const query = graphql`
  query BlogPost($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        type
        title
        date(formatString: "MMMM D, YYYY")
        galleries {
          image
        }
      }
      body
    }
  }
`;

export default BlogPost;
