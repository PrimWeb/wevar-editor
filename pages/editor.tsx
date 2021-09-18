// noinspection CheckTagEmptyBody

import { Button }                     from "@/components/selectors/Button";
import { Custom3 }                    from "@/components/selectors/Custom3";
import { Paper }                      from "@/components/selectors/Paper";
import { Video }                      from "@/components/selectors/Video";
import { Editor, Element, Frame }     from "@craftjs/core";
import CssBaseline                    from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { NextSeo }                    from "next-seo";
import React                          from "react";

import { RenderNode, Viewport }      from "../components/editor";
import { Container, Text }           from "../components/selectors";
import { Custom1, OnlyButtons }      from "../components/selectors/Custom1";
import { Custom2, Custom2VideoDrop } from "../components/selectors/Custom2";

let props: {};

const theme = createTheme({
    typography: {
        fontFamily: [ "acumin-pro", "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", ].join(","),
    }
});

// noinspection FunctionNamingConventionJS
function App() {

    return (<ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="h-full h-screen">
            <NextSeo
                title="Wevar Editor"
                description="A React framework for building drag-n-drop page editors."
                canonical="https://we.prim.dev/"
            />
            <Editor
                resolver={{
                    Container, Text, Custom1, Custom2, Custom2VideoDrop, Custom3, OnlyButtons, Button, Video, Paper
                }}
                enabled={true}
                onRender={RenderNode}>
                <Viewport>
                    <Frame>
                        <Element
                            canvas
                            is={Paper}
                            width="800px"
                            height="1131px"
                            background={{r: 255, g: 255, b: 255, a: 1}}
                            padding={[ "20", "20", "20", "20" ]}
                            custom={{displayName: "Papír A4"}}>
                        </Element>
                    </Frame>
                </Viewport>
            </Editor>
        </div>
    </ThemeProvider>);
}

export default App;
