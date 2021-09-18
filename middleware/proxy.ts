// include dependencies
// import validator                 from "@babel/core/lib/config/validation/options";

import express                   from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

// proxy middleware options

const options = {
    target: 'https://rest-api.restu.cz', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
        '^/api/r1': '/v1', // rewrite path
        //'^/api/remove/path': '/path', // remove base path
    }, router: {
        // when request.headers.host == 'dev.localhost:3000',
        //override target 'http://www.example.org' to 'http://localhost:8000'
        '194.182.69.48:3000': 'https://rest-api.restu.cz',
    },
};
/**
 * @return {Boolean}
 */
const filter = function (pathname, req) {
    return pathname.match('^/api/.*"') && [ 'GET', 'OPTION' ].includes(req.method);
};

// create the proxy (without context)
export const restuProxy = createProxyMiddleware(filter, options);

// This is a SWR middleware for keeping the data even if key changes.
export const use = () => {
    const app = express();
    app.use('/api', restuProxy);
    app.listen(3000);
};
// mount `restuProxy` in web server
/*
 //Context matching
 // Handle the next middleware, or the `useSWR` hook if this is the last one.
 const proxy:HttpProxyMiddleware = new HttpProxyMiddleware(this.context, options);
 console.log(proxy);
 const swr = useSWRNext(key, fetcher, config);
 // After hook runs...
 console.log('After: ', swr);
 }
 }

 module.exports = (req, res, next) => {

 console.log(req, res, next);
 if (req.headers.origin) {
 const originSchema = {
 oneOf: [{
 type: 'string', pattern: '^[a-z\\-]+:\\/\\/(?:[\\w\\-\\.]+(:[0-9]+)?/?)?$'
 }, {
 type: 'string', pattern: '^[a-z\\-]+:\\/\\/(?:\\[([a-z0-9]{0,4}\\:?)+\\])?/?(:[0-9]+)?$'
 }]
 };

 // very relaxed validation....
 validator(originSchema, req.headers.origin).then(function () {
 res.set({
 'Access-Control-Allow-Origin': '*', //req.headers.origin,
 'Access-Control-Allow-Credentials': true,
 'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
 'Access-Control-Allow-Headers': 'Content-Type, Cache-Control, Pragma, Expires, Authorization, X-Dataset-Total, X-Dataset-Offset, X-Dataset-Limit',
 'Access-Control-Max-Age': 5 * 60,
 'Access-Control-Expose-Headers': 'X-Dataset-Total, X-Dataset-Offset, X-Dataset-Limit'
 });
 next();
 }).catch(next);
 } else {
 // No origin
 next();
 }

 };

 */
