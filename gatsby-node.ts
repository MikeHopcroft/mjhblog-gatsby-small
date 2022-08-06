import type {GatsbyNode, PageProps} from 'gatsby';
import _ from 'lodash';
import * as path from 'path';

import {ImageDescriptor} from './src/interfaces';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({actions, schema}) => {
    const {createTypes} = actions;
    const typeDefs = [
      `type ImagesYaml implements Node {
        image: ImageSharp
      }`,
      schema.buildObjectType({
        name: 'ImagesYaml',
        fields: {
          image: {
            type: 'ImageSharp',
            resolve: (source, args, context, info) => {
              // console.log('>>>>: ' + JSON.stringify(context.path, null, 2));
              // console.log('>>>>: ' + JSON.stringify(source, null, 2));
              // console.log(`>>>>: "${pathPrefix}"`);
              // const parent = context.nodeModel.getNode()
              // filter: {fields: {relativePath: {eq: "icon.png"}}}
              // return context.nodeModel.findOne({
              //   type: 'ImageSharp',
              //   query: {
              //     filter: {
              //       gatsbyImageData: {},
              //       fluid: {originalName: {eq: source.image}},
              //       // parent: {relativePath: {eq: source.image}},
              //     },
              //   },
              // });
              const parent = context.nodeModel.getNodeById({
                id: source.parent,
              });
              // const relativeDirectory = parent.relativeDirectory;
              const image = path.posix
                .resolve('/', parent.relativeDirectory, source.image)
                .slice(1);
              console.log(`>>>>: "${image}"`);

              // console.log(`>>>>: "${source.image}"`);
              // console.log(`====: "${source.parent}"`);
              // try {
              //   const parent = context.nodeModel.getNodeById({
              //     id: source.parent,
              //   });
              //   console.log('++++: ' + JSON.stringify(parent, null, 2));
              // } catch (e) {
              //   console.log('Error: ' + e);
              //   console.log(typeof context.nodeModel.getNode);
              //   console.log(context.nodeModel.getNode);
              // }
              return context.nodeModel.findOne({
                type: 'ImageSharp',
                query: {
                  filter: {
                    // gatsbyImageData: {},
                    fields: {relativePath: {eq: image}},
                    // parent: {relativePath: {eq: source.image}},
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

// Add fields to support blog post archive, grouped by year-month.
export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const {createNodeField} = actions;

  // console.log(node.internal.type);
  // if (node.internal.type === 'ImagesYaml') {
  //   // console.log(JSON.stringify(node, null, 2));
  //   const parent = getNode(node.parent!);
  //   console.log('>>>: ' + JSON.stringify(parent, null, 2));
  // }
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

    // console.log(JSON.stringify((node.frontmatter as any).galleries));
  }
  //  else if (node.internal.type === 'ImageSharp') {
  //   createNodeField({node, name: 'relativePath', value: 'foobar'});
  //   // const parent = getNode(node.parent);
  //   // console.log(JSON.stringify(parent, null, 2));
  //   // console.log(JSON.stringify(node, null, 2));
  //   // console.log('=========================================');
  //   // throw 0;
  // }
};

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
            fluid {
              originalName
            }
            original {
              src
            }
            gatsbyImageData
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
    // console.log(JSON.stringify(x, null, 2));
    if (!x.image) {
      // TODO: better error handling here.
      // Print warning.
      // Substitue error image.
      continue;
    }
    const name = x.image!.fluid!.originalName!;
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
        src: x.image!.original!.src!,
      };
    }
  }

  console.log(
    '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%'
  );
  // console.log('data: ' + JSON.stringify(data));
  // console.log(createPage);

  const tagTemplate = path.resolve('./src/templates/tag-template.tsx');
  data.tagsGroup.group.forEach(tag => {
    // console.log(tag);
    createPage({
      path: `/tags/${_.kebabCase(tag!.fieldValue!)}/`,
      component: tagTemplate,
      context: {
        tag: tag!.fieldValue!,
      },
    });
  });

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

  const blogPostTemplate = path.resolve('./src/templates/blog-post.tsx');
  data.allMdx.edges.forEach(edge => {
    // console.log('SLUG: ' + edge.node.slug);
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

// function escapeRegex(s: string) {
//   return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
// }
