# Map to make it easy to locate and crowd source COVID-19 testing locations

## Local Development

* npm start
* npm test
* npm run build

## Deploying

* Staging 
  * Push feature branch to `develop` and Actions will deploy it to `staging.findcovidtesting.com`

* Production 
  * Merge `develop` into `master`

GH Actions will deploy commits to master. Because of this, please make sure master is stable. 

Actions pipelines will build static assets, sync to s3, and then invalidate Cloudfront. 
