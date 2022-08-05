import {GatsbyImage} from 'gatsby-plugin-image';
import React from 'react';
import Lightbox from 'react-image-lightbox';

import {
  container,
  gridCell,
  imageWrapper,
  titleOverlay,
  titleText,
  wrapper,
} from './gallery.module.css';

type GalleryDescriptor = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<Queries.BlogPostQuery['mdx']>['frontmatter']
    >['galleries']
  >[number]
>;

type ImageDescriptor = GalleryDescriptor['contents'][number];

interface Props {
  gallery: GalleryDescriptor;
}

interface State {
  photoIndex: number;
  isOpen: boolean;
}

class Gallery3 extends React.Component<Props, State> {
  images: string[];

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

    this.images = props.gallery.contents.map(
      x => x.image?.childImageSharp?.original!.src!
    );

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
            {this.props.gallery.contents.map((x, i) => this.getImage(x, i))}
          </div>
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
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
    const original = image.image?.childImageSharp?.original!;
    const aspectRatio = original.width! / original.height!;

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
          // position: 'relative',
          // flexGrow: 1,
          gridColumn,
          gridRow,
        }}
        onClick={() => this.onClick(index)}
      >
        <GatsbyImage
          className={imageWrapper}
          alt="foobar"
          image={image.image?.childImageSharp!.gatsbyImageData!}
        />
        <div className={titleOverlay}></div>
        <div className={titleText}>Text</div>
      </div>
    );
  }
}

export default Gallery3;
