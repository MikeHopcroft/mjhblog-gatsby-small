import {GatsbyImage, IGatsbyImageData} from 'gatsby-plugin-image';
import React from 'react';

import {
  caption,
  container,
  imageBorder,
  imageWrapper,
} from './image.module.css';

// TODO: remove duplication
interface ImageDescriptor {
  name: string;
  title: string | null;
  caption: string | null;
  gatsbyImageData: IGatsbyImageData;
  src: string;
}

interface Props {
  props: {
    pageContext: {
      images: {[key: string]: ImageDescriptor};
    };
  };
  image: string;
}

class Image extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const image = this.props.props.pageContext.images[this.props.image];
    return (
      <div className={container}>
        <a href={image.src}>
          <div className={imageBorder}>
            <GatsbyImage
              className={imageWrapper}
              // style={{width: '100%'}}
              alt="foobar"
              title={image.title ? image.title : ''}
              image={image.gatsbyImageData}
            />
          </div>
        </a>
        {renderCaption(image.caption)}
      </div>
    );
  }
}

function renderCaption(text: string | null) {
  if (caption) {
    return <div className={caption}>{text}</div>;
  }
}

export default Image;
