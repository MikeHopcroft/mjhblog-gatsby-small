import {graphql, PageProps} from 'gatsby';
import * as React from 'react';

import BlogPostList from '../components/blogpostlist';
import BlogPage from '../components/blogpage';

const BlogHome = (props: PageProps<Queries.BlogHomePageQuery>) => {
  return (
    <BlogPage>
      <BlogPostList posts={props.data.allMdx.nodes} />
    </BlogPage>
  );
};

export const query = graphql`
  query BlogHomePage {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: {frontmatter: {type: {eq: null}}}
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      nodes {
        ...BlogPostInfoFragment
      }
    }
  }
`;

export default BlogHome;
