import { graphql, Link, PageProps } from "gatsby";
import * as React from "react";
import { Helmet } from 'react-helmet';

// styles
const pageStyles = {
    color: "#232129",
    padding: 96,
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const headingStyles = {
    marginTop: 0,
    marginBottom: 64,
}

const paragraphStyles = {
    marginBottom: 48,
}

// markup
// https://jhackshaw.com/post/efficient-types-with-gatsby
const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {

    const data0 = { site: { siteMetadata: { title: 'foobar' } } };

    return (
        <main style={pageStyles}>
            <Helmet>
                <title>Home Page | {data0.site.siteMetadata.title}</title>
            </Helmet>
            <h1 style={headingStyles}>
                This is the home page for <b>{data0.site.siteMetadata.title}</b>
                <br />
            </h1>
            <p style={paragraphStyles}>
                Some text aaa
            </p>

            <ul>
                {
                    data.allMdx.nodes.map(node => (
                        <li key={node.id}>
                            <b><Link to={node.slug!}>{node.frontmatter!.title}</Link> : {node.frontmatter!.date}</b>
                            <br/>
                            {node.slug}
                            <br/>
                            <i>{node.excerpt}</i>
                        </li>
                    ))
                }
            </ul>
        </main>
    );
}

export const query = graphql`
  query IndexPage {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
        nodes {
            frontmatter {
                title
                date
            }
            excerpt
            id
            body
            slug
        }
    }
  }
`

export default IndexPage
