# Map to make it easy to locate and crowd source COVID-19 testing locations

## Local Development

To get started:

`npm install`

Start the local server with hot reload:

`npm start`

Run tests:

`npm test`

## Development and Deploying

* Develop locally in a feature branch
* Open a PR from feature branch to `master` 
* If merged, Actions will deploy it to `staging.findcovidtesting.com`
* Once verified, a maintainer will create a tag to deploy to production

Actions pipelines will build static assets, sync to s3, and then invalidate Cloudfront. 
