# Map to make it easy to locate and crowd source COVID-19 testing locations

## Development

* npm start
* npm test
* npm run build
* npm run deploy

## Deploying
To deploy to Cloudfront, merge into the `cloudfront` branch and GH Actions will take care of the rest.

Actions will build static assets, sync to s3, and then invalidate cloudfront. 