~~~
query MyQuery {
  allImageSharp {
    edges {
      node {
        id
        parent {
          id
          ... on File {
            id
            name
            absolutePath
            relativePath
            relativeDirectory
            publicURL
          }
        }
      }
    }
  }
  mdx {
    id
    frontmatter {
      title
    }
  }
}
~~~

~~~
query MyQuery {
  allFile(
    filter: {extension: {regex: "/jpg|png/"}, relativeDirectory: {eq: "2012/9/2012-09-21-atelier-picnic-at-carkeek-park/images"}}
  ) {
    edges {
      node {
        id
        absolutePath
        relativePath
      }
    }
  }
}
~~~

~~~
query MyQuery {
  allFile(
    filter: {extension: {regex: "/jpg|png/"}, relativeDirectory: {eq: "2012/9/2012-09-21-atelier-picnic-at-carkeek-park/images"}}
  ) {
    edges {
      node {
        id
        absolutePath
        relativePath
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
}
~~~
