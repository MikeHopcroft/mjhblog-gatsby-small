## Features
* Next/prev links
* Search
    * https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-search/
* Comments
* Formatting for images
    * Border
    * Caption
* . Image gallery with light table
    * https://www.gatsbyjs.com/plugins/gatsby-remark-images-grid/
    * https://engineering.belchior.me/creating-a-custom-photo-gallery-using-gatsbyjs-and-css-grid-ck8ghm0vn01vkz3s1ulux9v17
    * https://medium.com/seminal/making-an-awesome-image-gallery-using-a-css-grid-6f3da0937345
* Navbar organized by month
    * Month pages
* Tags
    * Tag cloud
    * Tag pages
* Featured posts
* Featured image
* How to deal with two posts on the same date?
* Navbar
* About page
* Contact page
* Gallery pages
* Google tag
* . Banner image
* Posted on date
* 404 page
* Pagination/infinite scrol?

## Tooling
* x Markdown support in VSCode. Should be able to continue lists with carriage return.
* x Indent with 2 spaces
* x Prettier
* Linter
* GTS

## Import
* Script to copy over files from WordPress export
    * Remove date from post folder name - keep day
    * Add day folder
    * Images should be peers of blog post unless part of a justified image grid gallery

## Bugs
* First image broken for mobile on Russia with Love
* NavItems extend into header.
* Navbar should fit on IPhone SE. Or use hamburger menu.
* Block quote on atelier-picnic-at-carkeek-park should be italicized
* Remove image thumbnails
* Look at each page
* Getting props.pageContext to mdx renderer
    * https://github.com/gatsbyjs/gatsby/issues/23490

## Deployment
* Investigate ways to incrementally deploy to Azure blob storage
    * azcopy - what happens to timestamps on clone? Might be a problem for CI/CD
    * Use git to keep track of which files should be deployed - only those that have changed since a certain SHA
    * https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-static-site-github-actions?tabs=userlevel
* Investigate private Azure repo - for increase size limits
* Investigate serving directly from git repo on bluehost
* Investigate CDN



## TODO
* Typescript types for react props
    * https://jhackshaw.com/post/efficient-types-with-gatsby
    * https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/
* Master stylesheet
    * Black background
    * White font
    * Font type and sizes
    * Gray borders
* . Use GatsbyImage instead of external image links
    * Styling for images - border/padding
        * May have to override img tag in MDXProvider.
* Page layout component
    * OtherPosts and BlogPosts should be determined by frontmatter
    * Reintroduce React Helment component
    * https://www.w3schools.com/html/html_responsive.asp
    * x Figure out how to let body go wider
    * Text block has max width
    * Header
    * Top navbar - consider hamburger menu instead
    * Right sidebar
        * Featured posts
        * Monthly archive
        * Tag cloud
    * Blog page doesn't have right slider
    Alt text for banner
* Blog page list
    * Hero images
    * Responsive layout with CSS grid
* Image gallery
    * Subdirectory filtering
    * Understand CSS grid layout
    * Masonry grid
        * Image size treatment
        * Consider listing images in gallery tag or frontmatter
    * Lightbox
* Styles
    * General organizing principle
    * H1
    * A
    * Main text
    * Left and right margins
    * Image borders
        * Gray
        * White
        * Hover
* Try out GatsbyCloud
* Try out large incremental build locally and in the cloud

# Next
* x Tag summary page
* x Archive summary page
* BUG: sidebar gets clipped as window becomes narrower
  * http://localhost:8000/2012/9/2012-09-09-school-supplies/
  * Seems to be when there is an image on the page
* Blog post publish date below title
* Page centering
* Remove all inline style={{}}
* Add layouts to MDX renderer so that all pages can be MDX
* Gallery2
  * scale
  * Captions and titles
  * foobar alt text
  * x Frontmatter image lists - order, size
  * x CSS grid
  * x React image lightbox
    * x https://stackoverflow.com/questions/54834930/how-to-include-local-javascript-on-a-gatsby-page
    * x https://www.gatsbyjs.com/docs/using-client-side-only-packages/
  * x Cleanup old GraphQL for old gallery
  * x Cleanup gallery2, gallery3
  * x Cleanup relative path and regex
* Image Grid
  * 2-wide as in http://www.michaeljhopcroft.com/2015/10/29/norma-bassett-hall/
* Next/Previous links on blog posts
    * Wait on deprecating original Gallery that queries all images
* Pagination
* . Tag cloud
  * x Link hover styling
  * Widget title styling to more general CSS file
  * Widget title styling to match original
* Featured posts
  * x Links to posts
  * x Tooltip
  * BUG: image widths on bottom of page in mobile
* Archive
  * x Grouping by month: https://github.com/gatsbyjs/gatsby/issues/27163

