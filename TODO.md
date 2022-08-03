## Next
* Image
  * Hyperlink to full image
  * Border with hover styling
  * Caption area
  * Red X for error (with diagnostic message)
    * Error component
  * Check for duplicate image entries
  * Check for ImageSharps with same fluid.originalName
  * Check for dangling image entries
  * Log errors to special error page
  * Rename image to gatsbyImageData
  * Optional title, caption, alt text
  * Override title, caption, alt text
* Gallery
  * Modify to take props and id instead of props.pageContext.galleries[id]
  * Index by id instead of position - or get rid of ids
  * Use image names instead of paths
  * Types: justified, grid
* Investigate passing pageContext automatically to components
* Investigate invisible character in "Lunch time brought a lively discussion of this sonnet" - might be an MDX colorizing error

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
    * Detect and remove smaller versions of images
    * Detect and remove unreferenced images
  * Consider putting page content in separate repo from Gatsby site

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
* https://docs.microsoft.com/en-us/azure/cloud-services-extended-support/swap-cloud-service 
* https://www.gatsbyjs.com/docs/conceptual/image-plugin-architecture/
* Investigate ways to incrementally deploy to Azure blob storage
    * azcopy - what happens to timestamps on clone? Might be a problem for CI/CD
    * Use git to keep track of which files should be deployed - only those that have changed since a certain SHA
    * https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-static-site-github-actions?tabs=userlevel
* Investigate private Azure repo - for increase size limits
* Investigate serving directly from git repo on bluehost
* Investigate CDN
* Stable image file naming
  * Google: gatsby stable image names
    * https://github.com/gatsbyjs/gatsby/issues/11479
    * https://github.com/gatsbyjs/gatsby/issues/6232
  * Google: gatsby stable image names git repo
  * https://www.gatsbyjs.com/plugins/gatsby-source-git/
  * https://stackoverflow.com/questions/57113747/using-a-git-repo-to-keep-other-gatsby-sites-in-sync
  * https://github.com/gatsbyjs/gatsby/issues/13699



## TODO
* x Typescript types for react props
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
    * Reintroduce React Helmet component - or Gatsby Head
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
    * x Hero images
    * Responsive layout with CSS grid
* Image gallery
    * x Subdirectory filtering
    * x Understand CSS grid layout
    * x Masonry grid
        * Image size treatment
        * Consider listing images in gallery tag or frontmatter
    * x Lightbox
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
* Try yarn for legacy peer dependency problem
* Investigate
  * react-slick
  * tailwind css
* x Separate pages from blog posts
  * x Based on page or post folder?
* Next/Previous links on blog posts
    * x Wait on deprecating original Gallery that queries all images
    * Wait on separating posts from pages. Next/prev only for posts.
* React Helmet
* Pagination
* x Don't render missing hero images
* x Click on hero image should navigate to blog post
* x Hero image should have hover styling
* x Blog post publish date below title
* 404 page
* Favicon
* Blog post title margins and em sizing
* Page centering
* BUG: sidebar gets clipped as window becomes narrower
  * http://localhost:8000/2012/9/2012-09-09-school-supplies/
  * Seems to be when there is an image on the page
  * Issue is that image sources haven't been updated to local images.
* Image captions
* Remove extra <div> elements
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
* . Tag cloud
  * x Link hover styling
  * Widget title styling to more general CSS file
  * Widget title styling to match original
* Featured posts
  * x Links to posts
  * x Tooltip
  * x BUG: image widths on bottom of page in mobile
* Archive
  * x Grouping by month: https://github.com/gatsbyjs/gatsby/issues/27163
* x Tag summary page
* x Archive summary page
* x Remove all inline style={{}}
* x Header image full bleed
  * https://stackoverflow.com/questions/12582624/what-is-a-user-agent-stylesheet
  * https://meyerweb.com/eric/tools/css/reset/
  * https://necolas.github.io/normalize.css/


http://localhost:8000/static/4da918fc5bfedb9633d49bb4fc41ad2c/e5166/IMG_0170.jpg
<img class="gatsby-resp-image-image" alt="alt text" title="Par Avion" src="/static/4da918fc5bfedb9633d49bb4fc41ad2c/e5166/IMG_0170.jpg" srcset="/static/4da918fc5bfedb9633d49bb4fc41ad2c/f93b5/IMG_0170.jpg 300w,/static/4da918fc5bfedb9633d49bb4fc41ad2c/b4294/IMG_0170.jpg 600w,/static/4da918fc5bfedb9633d49bb4fc41ad2c/e5166/IMG_0170.jpg 1200w,/static/4da918fc5bfedb9633d49bb4fc41ad2c/d9c39/IMG_0170.jpg 1800w,/static/4da918fc5bfedb9633d49bb4fc41ad2c/df51d/IMG_0170.jpg 2400w,/static/4da918fc5bfedb9633d49bb4fc41ad2c/93719/IMG_0170.jpg 4000w" sizes="(max-width: 1200px) 100vw, 1200px" loading="lazy" decoding="async" style="width: 100%; height: 100%; margin: 0px; vertical-align: middle; position: absolute; top: 0px; left: 0px; opacity: 1; transition: opacity 0.5s ease 0s; color: inherit; box-shadow: white 0px 0px 0px 400px inset;">

