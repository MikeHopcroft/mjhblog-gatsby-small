import {GatsbyImage, IGatsbyImageData} from 'gatsby-plugin-image';
import React from 'react';
// import Lightbox from 'react-image-lightbox';

// import {container, imageWrapper, wrapper} from './gallery.module.css';

// type GalleryDescriptor = NonNullable<
//   NonNullable<
//     NonNullable<
//       NonNullable<Queries.BlogPostQuery['mdx']>['frontmatter']
//     >['galleries']
//   >[number]
// >;

// type ImageDescriptor = GalleryDescriptor['contents'][number];

// interface Props {
//   gallery: GalleryDescriptor;
// }

// interface State {
//   photoIndex: number;
//   isOpen: boolean;
// }

// TODO: remove duplication
interface ImageDescriptor {
  name: string;
  title: string;
  caption: string;
  image: IGatsbyImageData;
}

interface Props {
  // image: IGatsbyImageData;
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
      <div style={{width: '100%'}}>
        <div style={{width: '100%'}}>
          <GatsbyImage
            // className={imageWrapper}
            style={{width: '100%'}}
            alt="foobar"
            title={image.title}
            image={image.image}
          />
        </div>
        <div>{image.caption}</div>
      </div>
    );
  }
}

export default Image;
