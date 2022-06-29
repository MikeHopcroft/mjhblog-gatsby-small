import type { GatsbyNode, PageProps } from "gatsby";
import _ from "lodash";
import { resolve } from "path";

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql(`
    query Tags {
      allMdx {
        edges {
          node {
            id
            slug
            frontmatter {
              tags
            }
            parent {
              ... on File {
                relativeDirectory
              }
            }
          }
        }
      }
      tagsGroup: allMdx {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  const { data }: PageProps<Queries.TagsQuery> = result as any;

  console.log(
    "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
  );
  console.log("data: " + JSON.stringify(data));
  console.log(createPage);

  const tagTemplate = resolve(`./src/templates/tag-template.tsx`);
  data.tagsGroup.group.forEach((tag) => {
    console.log(tag);
    createPage({
      path: `/tags/${_.kebabCase(tag!.fieldValue!)}/`,
      component: tagTemplate,
      context: {
        tag: tag!.fieldValue!,
      },
    });
  });

  const blogPostTemplate = resolve(`./src/templates/blog-post.tsx`);
  data.allMdx.edges.forEach((edge) => {
    console.log("SLUG: " + edge.node.slug);
    createPage({
      path: edge.node.slug!,
      component: blogPostTemplate,
      context: {
        id: edge.node.id,
        relativeDirectory: edge.node.parent!.relativeDirectory,
        regex: '/' + escapeRegex(edge.node.parent!.relativeDirectory) + '/',
      },
    });
  });

  console.log(
    "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
  );
};

function escapeRegex(s: string) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

