import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import { container, imageWrapper, item, widgetTitle, wrapper } from "./featured.module.css";

const Featured = () => {
  const data = useStaticQuery(graphql`
    query Featured {
      allMdx(filter: { frontmatter: { featured: { eq: true } } }) {
        nodes {
          frontmatter {
            title
            hero_image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          slug
        }
      }
    }
  `) as Queries.FeaturedQuery;

  return (
    <div
      style={{
        backgroundColor: "#303030",
        color: "black",
      }}
    >
      <div className={widgetTitle}>Featured Posts</div>
      <div className={wrapper}>
        <div className={container}>
          {data.allMdx.nodes.map((x) =>
            [
              <Link className={item} to={'/' + x.slug!}>
                <GatsbyImage
                  className={imageWrapper}
                  alt="foobar"
                  image={
                    x.frontmatter?.hero_image?.childImageSharp?.gatsbyImageData!
                  }
                  title={x.frontmatter?.title}
                />
              </Link>,
              <div className={item}>
                <GatsbyImage
                  className={imageWrapper}
                  alt="foobar"
                  image={
                    x.frontmatter?.hero_image?.childImageSharp?.gatsbyImageData!
                  }
                />
              </div>,
              <div className={item}>
                <GatsbyImage
                  className={imageWrapper}
                  alt="foobar"
                  image={
                    x.frontmatter?.hero_image?.childImageSharp?.gatsbyImageData!
                  }
                />
              </div>,
              <div className={item}>
                <GatsbyImage
                  className={imageWrapper}
                  alt="foobar"
                  image={
                    x.frontmatter?.hero_image?.childImageSharp?.gatsbyImageData!
                  }
                />
              </div>,
              <div className={item}>
                <GatsbyImage
                  className={imageWrapper}
                  alt="foobar"
                  image={
                    x.frontmatter?.hero_image?.childImageSharp?.gatsbyImageData!
                  }
                />
              </div>,
            ]
          )}
        </div>
      </div>
    </div>
  );
};

export default Featured;
