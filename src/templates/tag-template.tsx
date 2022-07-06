import { graphql, PageProps } from "gatsby";
import React from "react";

import BlogPostList from "../components/blogpostlist";
import BlogPage from "../components/blogpage";

function TagTemplate({ data, pageContext }: PageProps<Queries.TagPageQuery>) {
  return (
    <BlogPage>
      <h1>Tag: {(pageContext as any).tag}</h1>
      <BlogPostList posts={data.allMdx.nodes} />
    </BlogPage>
  );
}

export const query = graphql`
  query TagPage($tag: String) {
    allMdx(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        ...BlogPostInfoFragment
      }
    }
  }
`;

export default TagTemplate;
