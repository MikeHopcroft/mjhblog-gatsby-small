import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

import { widgetTitle } from "./archive.module.css";

type ArchiveInfo = Queries.ArchiveQuery['allMdx']['group'][number];

const Archive = () => {
  const data = useStaticQuery(graphql`
    query Archive {
      allMdx {
        group(field: fields___year_month) {
          fieldValue
          totalCount
        }
      }
    }
  `) as Queries.ArchiveQuery;

  const items = [...data.allMdx.group].sort((a,b)=>-a.fieldValue!.localeCompare(b.fieldValue!))

  return (
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <div className={widgetTitle}>Archive</div>
      {
        items.map(createDate)
      }
    </div>
  );
};

function createDate(info: ArchiveInfo) {
  // TODO: removed duplicate code in archive-template.tsx
  const x = new Date(info.fieldValue!);
  const month = x.toLocaleString('default', { timeZone: 'utc', month: 'long' });
  const anchorText = `${month} ${x.getFullYear()}`;
  const slug = '/' + info.fieldValue;
  const title = `${info.totalCount} topic${info.totalCount>1?'s':''}`;

  return (<div><Link to={slug} title={title}>{anchorText}</Link></div>)
}

export default Archive;
