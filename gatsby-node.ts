import type {GatsbyNode, PageProps} from 'gatsby';
import _ from 'lodash';
import * as path from 'path';

import {ImageDescriptor} from './src/interfaces';

///////////////////////////////////////////////////////////////////////////////
//
// createSchemaCustomization()
//
///////////////////////////////////////////////////////////////////////////////
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({actions, schema}) => {
    const {createTypes} = actions;
    const typeDefs = [
      // `type MdxFrontmatter @infer {
      //   hero_image: String
      //   featured: Boolean
      // }`,
      // `type MdxFrontmatter @infer {
      //   featured: Boolean
      // }`,
      `type ImagesYaml implements Node {
        image: ImageSharp
      }`,
      schema.buildObjectType({
        name: 'ImagesYaml',
        fields: {
          image: {
            type: 'ImageSharp',
            resolve: (source, args, context, info) => {
              const parent = context.nodeModel.getNodeById({
                id: source.parent,
              });
              const image = path.posix
                .resolve('/', parent.relativeDirectory, source.image)
                .slice(1);
              console.log(`>>>>: "${image}"`);
              return context.nodeModel.findOne({
                type: 'ImageSharp',
                query: {
                  filter: {
                    fields: {relativePath: {eq: image}},
                  },
                },
              });
            },
          },
        },
      }),
    ];
    createTypes(typeDefs);
  };

///////////////////////////////////////////////////////////////////////////////
//
// onCreateNode()
//
///////////////////////////////////////////////////////////////////////////////
// Add fields to support blog post archive, grouped by year-month.
export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const {createNodeField} = actions;

  if (node.internal.type === 'ImageSharp') {
    const parent = getNode(node.parent!)!;
    createNodeField({node, name: 'relativePath', value: parent.relativePath});
  } else if (node.internal.type === 'Mdx') {
    const date = new Date((node.frontmatter as any).date);

    // TODO: get these from the slug, rather than the date.
    // Date is UTC and doesn't always have the same day and month
    // as the slug. Slug is the ground truth because it is part
    // of the permalink.
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const year_month = `${year}-${String(month).padStart(2, '0')}`;
    const day = date.getUTCDate() + 1;

    createNodeField({node, name: 'year', value: year});
    createNodeField({node, name: 'month', value: month});
    createNodeField({node, name: 'year-month', value: year_month});
    createNodeField({node, name: 'day', value: day});
  }
};

///////////////////////////////////////////////////////////////////////////////
//
// createPages()
//
///////////////////////////////////////////////////////////////////////////////
export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const {createPage} = actions;

  const result = await graphql(`
    query Tags {
      allMdx {
        edges {
          node {
            id
            slug
          }
        }
      }
      tagsGroup: allMdx {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      archiveGroup: allMdx {
        group(field: fields___year_month) {
          fieldValue
        }
      }
      allImagesYaml(filter: {}) {
        nodes {
          alt
          caption
          title
          image {
            original {
              src
            }
            gatsbyImageData
            fields {
              relativePath
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const {data}: PageProps<Queries.TagsQuery> = result as any;

  const images: {[key: string]: ImageDescriptor} = {};
  for (const x of data.allImagesYaml.nodes) {
    if (!x.image) {
      // Resolver in createSchemaCustomization() didn't manage to
      // find the ImageSharp for this YAML image.
      // TODO: better error handling here.
      // Print warning.
      continue;
    }

    const name = x.image!.fields!.relativePath!;
    // TODO: error check for missing image, title, caption, etc.
    // TODO: error check for duplicate image names.
    if (images[name]) {
      reporter.warn(`Ignoring duplicate image ${name}.`);
    } else {
      images[name] = {
        name,
        title: x.title,
        caption: x.caption,
        altText: x.alt,
        gatsbyImageData: x.image!.gatsbyImageData,

        // src field is used by the React Lightbox
        src: x.image!.original!.src!,
      };
    }
  }
  console.log(JSON.stringify(images, null, 2));

  console.log(
    '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%'
  );

  //
  // Generate tag pages
  //
  const tagTemplate = path.resolve('./src/templates/tag-template.tsx');
  data.tagsGroup.group.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag!.fieldValue!)}/`,
      component: tagTemplate,
      context: {
        tag: tag!.fieldValue!,
      },
    });
  });

  //
  // Generate blog archive page for each month
  //
  const archiveTemplate = path.resolve('./src/templates/archive-template.tsx');
  data.archiveGroup.group.forEach(archive => {
    createPage({
      path: '/' + archive.fieldValue!,
      component: archiveTemplate,
      context: {
        archive: archive!.fieldValue!,
      },
    });
  });

  //
  // Generate pages from markdown files.
  //
  const blogPostTemplate = path.resolve('./src/templates/blog-post.tsx');
  data.allMdx.edges.forEach(edge => {
    createPage({
      path: edge.node.slug!,
      component: blogPostTemplate,
      context: {
        id: edge.node.id,
        images,
      },
    });
  });

  console.log(
    '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%'
  );
};
