import React from 'react';
import Document, { Html, Head, Main} from 'next/document';
import { Renderer, OpenAPIApp } from '../components/openapi';

import '../styles/OpenAPI.css';

// noinspection HtmlRequiredTitleElement
export default class Openapi extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Step 5: Output the styles in the head  */}
                    {(this.props as any).styleTags}
                </Head>
                <body>
                <Main />
                <Renderer
                    enabled={false}
                    onRender={OpenAPIApp}
                />
                </body>
            </Html>
        );
    }
}
