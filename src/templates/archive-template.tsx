import { graphql, PageProps } from "gatsby";
import React from "react";

import BlogPostList from "../components/blogpostlist";
import BlogPage from "../components/blogpage";

function ArchiveTemplate({ data, pageContext }: PageProps<Queries.TagPageQuery>) {
  // TODO: removed duplicate code in archive.tsx
  const x = new Date((pageContext as any).archive);
  const month = x.toLocaleString('default', { timeZone: 'utc', month: 'long' });
  const anchorText = `${month} ${x.getFullYear()}`;

  return (
    <BlogPage>
      <div className="widget-title">Monthly Archives: {anchorText}</div>
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
