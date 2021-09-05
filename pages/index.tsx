// noinspection CheckTagEmptyBody

import { Editor, Frame, Element } from '@craftjs/core';
import { createTheme }            from '@material-ui/core';
import { ThemeProvider }          from '@material-ui/styles';
import { NextSeo }                from 'next-seo';
import React                      from 'react';

import { Viewport, RenderNode }      from '../components/editor';
import { Container, Text }           from '../components/selectors';
import { Button }                    from '../components/selectors/Button';
import { Custom1, OnlyButtons }      from '../components/selectors/Custom1';
import { Custom2, Custom2VideoDrop } from '../components/selectors/Custom2';
import { Custom3, CustomFetch }      from '../components/selectors/Custom3';
import { Video }                     from '../components/selectors/Video';

let props: {};

const theme = createTheme({
    typography: {
        fontFamily: [
            'acumin-pro',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="h-full h-screen">
                <NextSeo
                    title="Wevar Editor"
                    description="A React framework for building drag-n-drop page editors."
                    canonical="https://editor.prim.dev/"
                />
                <Editor
                    resolver={{
                        Container,
                        Text,
                        Custom1,
                        Custom2,
                        Custom2VideoDrop,
                        Custom3,
                        CustomFetch,
                        OnlyButtons,
                        Button,
                        Video,
                    }}
                    enabled={false}
                    onRender={RenderNode}
                >
                    <Viewport>
                        <Frame>
                            <Element
                                canvas
                                is={Container}
                                width="800px"
                                height="auto"
                                background={{r: 255, g: 255, b: 255, a: 1}}
                                padding={['40', '40', '40', '40']}
                                custom={{displayName: 'App'}}
                            >
                            </Element>
                        </Frame>
                    </Viewport>
                </Editor>
            </div>
        </ThemeProvider>
    );
}

export default App;
