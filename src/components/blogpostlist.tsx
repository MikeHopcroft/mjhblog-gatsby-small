import { Link, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";

import { container, post } from "./blogpostlist.module.css";

interface Props {
  posts: PageProps<Queries.BlogHomePageQuery>;
}

const BlogPostList = (props: Props) => {
  return (
    <div className={container}>
      {props.posts.data.allMdx.nodes.map((node) => [
        <div>
          <GatsbyImage
            alt="foobar"
            image={
              node.frontmatter?.hero_image?.childImageSharp?.gatsbyImageData!
            }
          />
        </div>,
        <div className={post}>
          <b>
            <Link to={'/' + node.slug!}>{node.frontmatter!.title}</Link>
          </b>
          <br />
          <i>{node.excerpt}</i>
        </div>,
      ])}
    </div>
  );
};

export default BlogPostList;
