const colors = require("./node_modules/tailwindcss/colors.js");

const securityHeaders = [
    {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
    }, {
        key: "X-DNS-Prefetch-Control",
        value: "on", // }, {
        //     key: "Origin",
        //     value: "*",
    },
];
const {API_URL} = process.env;
module.exports = {
    //productionBrowserSourceMaps: true,
    async rewrites() {
        return {
            // fallback: [
            //     {
            //         source: '/api/r1',
            //         has: [
            //             {
            //                 type: 'host',
            //                 value: undefined,
            //             },
            //         ],
            //         destination: API_URL,
            //     }, {
            //         source: '/api/r1/:path*',
            //         destination: `${API_URL}/:path*`,
            //     },
            // ],
            afterFiles: [
                {
                    source: '/restaurants',
                    destination: `/`,
                }, {
                    source: '/:path*',
                    destination: `/:path*`,
                }
            ]
        }
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                has: [],
                source: "/(.*)",
                headers: securityHeaders
            },
        ];
    }, // crossOrigin: "anonymous",
    envMode: process.env.NODE_ENV,
    api: {
        externalResolver: true,
    },
    theme: {
        colors: {
            gray: colors.warmGray,
        },
    }, // trailingSlash: true,
    stripTrailingSlash: true,
    experiments: {
        topLevelAwait: true,
    },
    env: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY
    },
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            crypto: require.resolve("crypto-browserify")
        };
        config.resolve.preferRelative = true;
        return config;
    },
};
