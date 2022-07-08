import { graphql, Link, useStaticQuery } from "gatsby";
import _ from "lodash";
import React from "react";

import { tag, widgetTitle } from "./tagcloud.module.css";

// TODO:
//   x Top n tags
//   Overflow
//   x Curated font sizes
//   Link hover styling - do this globally
//   x Function for URL mapping
//   . Style for side widget title (e.g tags, newsarchive, featured posts)

type TagInfo = Queries.TagCloudQuery["tagsGroup"]["group"][number];

const fontSizes = [
  "6pt",
  "7pt",
  "8pt",
  "9pt",
  "10pt",
  "11pt",
  "12pt",
  "13pt",
  "14pt",
];

function fontSizeAndTruncate(tags: readonly TagInfo[]) {
  const sorted = [...tags].sort((a, b) =>
    a.totalCount > b.totalCount
      ? -1
      : a.totalCount < b.totalCount
      ? 1
      : a.fieldValue! > b.fieldValue!
      ? -1
      : a.fieldValue! < b.fieldValue!
      ? 1
      : 0
  );
  const truncated = sorted.slice(0, 10) as (TagInfo & { fontSize?: string })[];
  const max = truncated.reduce((p, c) =>
    c.totalCount > p.totalCount ? c : p
  ).totalCount;
  for (const tag of truncated) {
    const fontSize =
      fontSizes[Math.floor((tag.totalCount / max) * (fontSizes.length - 1))];
    tag.fontSize = fontSize;
  }
  truncated.sort((a, b) => a.fieldValue!.localeCompare(b.fieldValue!));
  return truncated;
}

const TagCloud = () => {
  const data = useStaticQuery(graphql`
    query TagCloud {
      tagsGroup: allMdx(filter: { frontmatter: { type: { eq: null } } }) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `) as Queries.TagCloudQuery;

  const tags = fontSizeAndTruncate(data.tagsGroup.group);

  return (
    <div>
      <div className={widgetTitle}>Tags</div>
      {tags.map((x) => (
        <Link
          className={tag}
          // Following inline style necessary for computed font size.
          style={{ display: "inline-block", fontSize: x.fontSize }}
          // TODO: use function for URL mapping here and in gatsby-node.ts.
          to={`/tags/${_.kebabCase(x.fieldValue!)}/`}
          title={`${x.totalCount} topics`}
        >
          {x.fieldValue}
        </Link>
      ))}
    </div>
  );
};

function fontSize(count: number) {
  return 12 * count + "pt";
}

export default TagCloud;
