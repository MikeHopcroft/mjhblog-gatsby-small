// import * as React from 'react'
// // import Layout from '../components/layout'
// const BlogPost = () => {
//   return (
//     // <Layout pageTitle="Super Cool Blog Posts">
//       <p>My blog post contents will go here (eventually).</p>
//     // </Layout>
//   )
// }
// export default BlogPost

import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
//import Layout from '../../components/layout'
const BlogPost = ({ data }) => {
  return (
    <div>
      <p>{data.mdx.frontmatter.date}</p>
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>
    </div>
  )
}
export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`
export default BlogPost