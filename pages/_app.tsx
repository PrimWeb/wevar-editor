// noinspection JSUnusedGlobalSymbols

import App, { AppContext, AppProps } from "next/app";
import React                         from 'react';

import '../styles/app.css';

// noinspection FunctionNamingConventionJS,ParameterNamingConventionJS
function MyApp(props: AppProps) {
    // noinspection LocalVariableNamingConventionJS
    const { Component, pageProps } = props;
    return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext: AppContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    let appProps = await App.getInitialProps(appContext);
    return { ...appProps };
};

export default MyApp;
