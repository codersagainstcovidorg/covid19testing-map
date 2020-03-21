# Map to make it easy to locate and crowd source COVID-19 testing locations

## Development

* npm start
* npm test
* npm run build
* npm run deploy

## Deploying
GH Actions will deploy commits to master. Because of this, please use feature branches and make sure master is stable. 

Actions will build static assets, sync to s3, and then invalidate cloudfront. 
