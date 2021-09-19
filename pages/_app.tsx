// noinspection JSUnusedGlobalSymbols

import App   from "next/app";
import React from 'react';

import '../styles/app.css';

// noinspection FunctionNamingConventionJS,ParameterNamingConventionJS
function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    let appProps = await App.getInitialProps(appContext);
    return { ...appProps };
};

// `getStaticProps` is executed on the server side.

// App.getStaticProps = async () => {
//     console.log(API);
//     const url = useRouter().asPath;
//     const repoInfo = await fetcher(url);
//     console.log("ServerSideProps", repoInfo, "ServerSideProps");
//     return {
//         props: {
//             fallback: {
//                 [url]: repoInfo,
//             },
//         },
//     };
// };

export default MyApp;
