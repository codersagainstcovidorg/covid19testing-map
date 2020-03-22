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
* Open a PR from feature branch to `develop` 
* If merged, Actions will deploy it to `staging.findcovidtesting.com`
* Once verified, open a PR from `develop` into `master`
* Actions will deploy to `findcovidtesting.com` on merge

Actions pipelines will build static assets, sync to s3, and then invalidate Cloudfront. 
