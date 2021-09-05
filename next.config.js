const colors = require("./node_modules/tailwindcss/colors.js");

const securityHeaders = [
  /*   {
    key: "Content-Security-Policy",
    value:
      "default-src https: 'unsafe-eval' 'unsafe-inline' 'self';" +
      //'     connect-src \'self\' https://rest-api.restu.cz;' +
      "     style-src 'self' 'unsafe-inline' https:;" +
      "     prefetch-src *;" +
      "     object-src *;" +
      "     child-src *;",
    // '     upgrade-insecure-requests;'
  }, */
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "access-control-request-method",
    value: "GET, OPTIONS, POST",
  },
];

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        has: [],
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: [
          // {key: 'Content-Security-Policy', value: 'https://rest-api.restu.cz'},
          { key: "Origin", value: "" },
        ],
      },
    ];
  },
  envMode: process.env.NODE_ENV,
  darkMode: true,
  theme: {
    colors: {
      gray: colors.warmGray,
    },
  },
  trailingSlash: true,
  experiments: {
    topLevelAwait: true,
  },
  env: {
    mongodburl:
      "mongodb://192.168.3.1:27017/wevarDev?replicaSet=SeptimTet&readPreference=primary&appname=Wevar%20Editor&directConnection=true&ssl=false",
  },
};
