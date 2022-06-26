## Features
* Next/prev links
* Search
    * https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-search/
* Comments
* Formatting for images
    * Border
    * Caption
* Image gallery with light table
* Navbar organized by month
* Tag cloud
* Featured posts
* How to deal with two posts on the same date?
* Navbar
* About page
* Contact page
* Gallery pages
* Google tag
* Banner image
* Posted on date

## Tooling
* Markdown support in VSCode. Should be able to continue lists with carriage return.
* Indent with 2 spaces
* Prettier
* Linter
* GTS

## Import
* Script to copy over files from WordPress export
    * Remove date from post folder name - keep day

## Bugs
* Block quote on atelier-picnic-at-carkeek-park should be italicized
* Remove image thumbnails
* Look at each page

## Deployment
* Investigate ways to incrementally deploy to Azure blob storage
    * azcopy - what happens to timestamps on clone? Might be a problem for CI/CD
    * Use git to keep track of which files should be deployed - only those that have changed since a certain SHA
    * https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-static-site-github-actions?tabs=userlevel
* Investigate private Azure repo - for increase size limits
* Investigate serving directly from git repo on bluehost
* Investigate CDN



## TODO
* Use GatsbyImage instead of external image links
* Page layout component
* Try out GatsbyCloud
* Try out large incremental build locally and in the cloud


