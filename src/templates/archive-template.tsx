import { graphql, PageProps } from "gatsby";
import React from "react";

import BlogPostList from "../components/blogpostlist";
import BlogPage from "../components/blogpage";

function ArchiveTemplate({ data, pageContext }: PageProps<Queries.TagPageQuery>) {
  return (
    <BlogPage>
      <h1>Archive: {(pageContext as any).archive}</h1>
      <BlogPostList posts={data.allMdx.nodes} />
    </BlogPage>
  );
}

export const query = graphql`
  query ArchivePage($archive: Date) {
    allMdx(
      filter: {fields: {year_month: {eq: $archive}}},
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        ...BlogPostInfoFragment
      }
    }
  }
`;

export default ArchiveTemplate;
