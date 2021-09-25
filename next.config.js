const { getServers } = require('dns/promises');
const { API_URL, API_KEY } = process.env;

const securityHeaders = [
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    { key: 'Origin', value: getServers().join(' ') }
];

module.exports = {
    productionBrowserSourceMaps: true,
    compilerOptions: {
        paths: {
            stream: [ './node_modules/readable-stream' ]
        }
    },
    async rewrites() {
        return {
            afterFiles: [
                {
                    source: '/restaurants/:path*',
                    destination: `/editor/:path*`
                },
                {
                    source: '/restaurants',
                    destination: `/`
                },
                {
                    source: '/:path*',
                    destination: `/:path*`
                }
            ]
        }
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                has: [],
                source: '/(.*)',
                headers: securityHeaders
            }
        ]
    },
    crossOrigin: 'use-credentials',
    stripTrailingSlash: true,
    experiments: {
        topLevelAwait: true
    },
    env: {
        API_URL: API_URL,
        API_KEY: API_KEY
    },
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve("stream-browserify")
        };
        config.resolve.preferRelative = true;
        return config
    }
};
