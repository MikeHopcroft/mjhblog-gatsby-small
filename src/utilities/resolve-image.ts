import {ImageDescriptor} from '../interfaces';

interface Props {
  props: {
    pageContext: {
      images: {[key: string]: ImageDescriptor};
      slug: string;
    };
  };
}

export function resolveImage(props: Props, imagePath: string) {
  const key = resolvePath(
    '/',
    props.props.pageContext.slug,
    'images',
    imagePath
  ).slice(1);

  // TODO: return error image here if key is not found.
  let image = props.props.pageContext.images[key];
  if (!image) {
    image = props.props.pageContext.images['image-not-found.png'];
  }
  return image;
}

// DESIGN NOTE: not using path.posix.resolve() because of issue described in
// https://stackoverflow.com/questions/67075747/gatsby-cant-resolve-path-in-c-users-gatsby-starter-hello-world-node-mo
function resolvePath(...parts: string[]): string {
  let path = '';
  for (let i = parts.length - 1; i >= 0; --i) {
    if (path.startsWith('/')) {
      break;
    }
    if (parts[i].endsWith('/') || !path) {
      path = parts[i] + path;
    } else {
      path = parts[i] + '/' + path;
    }
  }
  return path;
}
