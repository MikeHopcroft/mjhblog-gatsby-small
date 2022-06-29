import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface Props {
  path: string;
  images: { gatsbyImageData: IGatsbyImageData }[];
}

const Gallery = (props: Props) => {
  //     console.log('========================================');
  //     console.log(JSON.stringify(data,null,2));
  //     console.log('========================================');

  return (
    <div
      style={{
        // height: "200px",
        backgroundColor: "lightblue",
        color: "black",
      }}
    >
      xxx
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      Gallery (path={props.path})
      <div>
        {props.images.map((image) => (
          // <pre>{image.gatsbyImageData.width}</pre>
          <div style={{ width: 100 }}>
            <GatsbyImage alt="foobar" image={image.gatsbyImageData} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
