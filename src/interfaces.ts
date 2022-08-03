import {IGatsbyImageData} from 'gatsby-plugin-image';

export interface ImageDescriptor {
  name: string;
  title: string | null;
  caption: string | null;
  altText: string | null;
  gatsbyImageData: IGatsbyImageData;
  src: string;
}
