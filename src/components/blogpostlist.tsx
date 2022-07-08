import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";

import { BlogPostInfo } from "./blogpostfragment";

import { container, hero, post } from "./blogpostlist.module.css";

interface Props {
  posts: readonly BlogPostInfo[];
}

const BlogPostList = (props: Props) => {
  return (
    <div className={container}>
      {props.posts.map((node) => [
        getImage(node),
        <div className={post}>
          <b>
            <Link to={"/" + node.slug!}>{node.frontmatter!.title}</Link>
          </b>
          <br />
          <i>{node.excerpt}</i>
        </div>,
      ])}
    </div>
  );
};

function getImage(node: BlogPostInfo) {
  const image = node.frontmatter?.hero_image;
  if (image !== null && image !== undefined) {
    return (
      <Link className={hero} to={"/" + node.slug!}>
        <GatsbyImage
          alt="foobar"
          image={
            image.childImageSharp?.gatsbyImageData!
          }
        />
      </Link>
    );
  } else {
    return <div />;
  }
}

export default BlogPostList;
