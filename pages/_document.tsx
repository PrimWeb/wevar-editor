import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core';
import Document, { Head, Html, Main, NextScript }           from 'next/document';
import React                                                from 'react';
import { ServerStyleSheet }                                 from 'styled-components';

export default class RestuDocument extends Document {

    static getInitialProps({ renderPage }) {
        // Step 1: Create an instance of ServerStyleSheet
        const sheet = new ServerStyleSheet();

        // Step 2: Retrieve styles from components in the page
        const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));

        const materialUISheets = new MaterialUiServerStyleSheets();
        // Step 3: Extract the styles as <style> tags
        const styleTags = sheet.getStyleElement();
        const styles = [ styleTags, materialUISheets.getStyleElement ];
        // Step 4: Pass styleTags as a prop
        return { ...page, ...styles };
    }

    render() {
        // noinspection HtmlRequiredTitleElement
        return (<Html>
            <Head>
                {/* Step 5: Output the styles in the head  */}
                {(this.props as any).styleTags}
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>);
    }
}

