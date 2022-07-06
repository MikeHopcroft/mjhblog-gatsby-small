import type { GatsbyNode, PageProps } from "gatsby";
import _ from "lodash";
import { resolve } from "path";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
    type MdxFrontmatterGalleries implements Node {
      contents: [MdxFrontmatterGalleriesContents!]!
    }
    type MdxFrontmatterGalleriesContents {
      scale: Float
    }
  `;
    createTypes(typeDefs);
  };

// Add fields to support blog post archive, grouped by year-month.
export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions }) => {
  const { createNodeField } = actions;

  console.log(node.internal.type);
  if (node.internal.type === "Mdx") {
    const date = new Date((node.frontmatter as any).date);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const year_month = `${year}-${String(month).padStart(2, '0')}`;
    const day = date.getUTCDate() + 1;

    createNodeField({ node, name: "year", value: year });
    createNodeField({ node, name: "month", value: month });
    createNodeField({ node, name: "year-month", value: year_month });
    createNodeField({ node, name: "day", value: day });
  }
};

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

  const archiveTemplate = resolve(`./src/templates/archive-template.tsx`);
  data.archiveGroup.group.forEach((archive) => {
    createPage({
      path: '/' + archive.fieldValue!,
      component: archiveTemplate,
      context: {
        archive: archive!.fieldValue!,
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
      },
    });
  });

  console.log(
    "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
  );
};

function escapeRegex(s: string) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
