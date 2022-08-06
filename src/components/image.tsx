import {GatsbyImage} from 'gatsby-plugin-image';
import React from 'react';

import {ImageDescriptor} from '../interfaces';
import {resolveImage} from '../utilities/resolve-image';

import {
  caption,
  container,
  imageBorder,
  imageWrapper,
} from './image.module.css';

interface Props {
  props: {
    pageContext: {
      images: {[key: string]: ImageDescriptor};
      slug: string;
    };
  };
  image: string;
}

class Image extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const image = resolveImage(this.props, this.props.image);

    return (
      <div className={container}>
        <a href={image.src}>
          <div className={imageBorder}>
            <GatsbyImage
              className={imageWrapper}
              alt={getAltText(image)}
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

function getAltText(image: ImageDescriptor) {
  return image.altText ? image.altText : image.caption ? image.caption : '';
}

export default Image;
