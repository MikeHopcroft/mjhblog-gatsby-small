import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import { container, imageWrapper, wrapper } from "./gallery.module.css";

// gatsbyimage extends beyond its container
// https://github.com/gatsbyjs/gatsby/issues/8935

type GalleryDescriptor = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<Queries.BlogPostQuery["mdx"]>["frontmatter"]
    >["galleries"]
  >[number]
>;

type ImageDescriptor = GalleryDescriptor["contents"][number];

interface Props {
  gallery: GalleryDescriptor;
}

const Gallery2 = (props: Props) => {
  return (
    <div className={wrapper}>
      <div className={container}>
        {props.gallery.contents.map((x) => getImage(x))}
      </div>
    </div>
  );
};

const sizes = [
  [1, 1],
  [1, 2],
  [2, 1],
  [2, 3],
  [3, 2],
  [3, 4],
  [4, 3],
  [4, 5],
  [5, 4],
];

function getImage(image: ImageDescriptor) {
  const original = image.image?.childImageSharp?.original!;
  const aspectRatio = original.width! / original.height!;

  const layout = sizes
    .map((s) => ({ size: s, delta: Math.abs(s[0] / s[1] - aspectRatio) }))
    .reduce((p, c) => (p.delta < c.delta ? p : c));

  const gridColumn = `span ${layout.size[0]}`;
  const gridRow = `span ${layout.size[1]}`;

  return (
    <div style={{ flexGrow: 1, gridColumn, gridRow }}>
      <GatsbyImage
        className={imageWrapper}
        alt="foobar"
        image={image.image?.childImageSharp!.gatsbyImageData!}
      />
    </div>
  );
}

export default Gallery2;
