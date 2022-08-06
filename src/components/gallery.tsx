import {GatsbyImage} from 'gatsby-plugin-image';
import React from 'react';
import Lightbox from 'react-image-lightbox';

import {ImageDescriptor} from '../interfaces';
import {resolveImage} from '../utilities/resolve-image';

import {
  container,
  gridCell,
  imageWrapper,
  titleOverlay,
  titleText,
  wrapper,
} from './gallery.module.css';

type GalleryDescriptor = {image: string}[];

interface Props {
  props: {
    pageContext: {
      images: {[key: string]: ImageDescriptor};
      galleries: GalleryDescriptor[];
      slug: string;
    };
  };
  id: number;
}

interface State {
  photoIndex: number;
  isOpen: boolean;
}

class Gallery extends React.Component<Props, State> {
  images: ImageDescriptor[];

  readonly sizes = [
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

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
      photoIndex: 0,
    };

    const gallery = props.props.pageContext.galleries[props.id]!;
    this.images = gallery.map(x => resolveImage(props, x.image));

    this.getImage = this.getImage.bind(this);
  }

  onClick(photoIndex: number) {
    this.setState({isOpen: true, photoIndex});
  }

  render() {
    const {isOpen, photoIndex} = this.state;
    const images = this.images;

    return (
      <div>
        <div className={wrapper}>
          <div className={container}>
            {images.map((x, i) => this.getImage(x, i))}
          </div>
        </div>

        {isOpen && (
          <Lightbox
            imageTitle={images[photoIndex].title}
            imageCaption={images[photoIndex].caption}
            mainSrc={images[photoIndex].src}
            nextSrc={images[(photoIndex + 1) % images.length].src}
            prevSrc={
              images[(photoIndex + images.length - 1) % images.length].src
            }
            onCloseRequest={() => this.setState({isOpen: false})}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
    );
  }

  getImage(image: ImageDescriptor, index: number) {
    const w = image.gatsbyImageData.width;
    const h = image.gatsbyImageData.height;
    const aspectRatio = w / h;

    const layout = this.sizes
      .map(s => ({size: s, delta: Math.abs(s[0] / s[1] - aspectRatio)}))
      .reduce((p, c) => (p.delta < c.delta ? p : c));

    const gridColumn = `span ${layout.size[0]}`;
    const gridRow = `span ${layout.size[1]}`;

    return (
      <div
        className={gridCell}
        // Following inline style necessary for computed grid properties.
        style={{
          gridColumn,
          gridRow,
        }}
        onClick={() => this.onClick(index)}
      >
        <GatsbyImage
          className={imageWrapper}
          alt="foobar"
          image={image.gatsbyImageData}
        />
        <div className={titleOverlay}></div>
        {renderTitle(image)}
      </div>
    );
  }
}

function renderTitle(image: ImageDescriptor) {
  if (image.title) {
    return <div className={titleText}>{image.title}</div>;
  }
}

export default Gallery;
