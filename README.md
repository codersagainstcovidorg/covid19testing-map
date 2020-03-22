# Map to make it easy to locate and crowd source COVID-19 testing locations

## Local Development

To get started:

`npm install`

Start the local server with hot reload:

`npm start`

Run tests:

`npm test`

## Local Development with Docker

Pre-reqs:
    1. docker installed
        Check with `docker version`
    2. make installed (if using provided Makefile)

Run `docker build -t findcovidtesting:latest .`manually or use
    `make build-docker`

Run `docker run -p 8080:3000 -d findcovidtesting` manually or use
    `make run-docker`

## Development and Deploying

* Develop locally in a feature branch
* Open a PR from feature branch to `develop` 
* If merged, Actions will deploy it to `staging.findcovidtesting.com`
* Once verified, open a PR from `develop` into `master`
* Actions will deploy to `findcovidtesting.com` on merge

Actions pipelines will build static assets, sync to s3, and then invalidate Cloudfront. 
