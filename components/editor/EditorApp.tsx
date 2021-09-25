// noinspection CheckTagEmptyBody
import { Button }                                    from "@/components/selectors/Button";
import { Custom3 }                                   from "@/components/selectors/Custom3";
import { Paper }                                     from "@/components/selectors/Paper";
import { RestuMenuCategory }                         from "@/components/selectors/RestuMenuCategory";
import { Video }                                     from "@/components/selectors/Video";
import { Editor, Frame }                             from "@craftjs/core";
import CssBaseline                                   from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider }                from "@material-ui/core/styles";
import { NextSeo }                                   from "next-seo";
import { useRouter }                                 from "next/router";
import React                                         from "react";
import { Container, RestuMenuItem, RestuText, Text } from "../selectors";
import { Custom1, OnlyButtons }                      from "../selectors/Custom1";
import { Custom2, Custom2VideoDrop }                 from "../selectors/Custom2";
import { RenderNode, Viewport }                      from "./index";

const theme = createTheme({
    typography: {
        fontFamily: [ "acumin-pro", "Roboto", '"Helvetica Neue"', "Arial", "sans-serif" ].join(",")
    }
});

// noinspection FunctionNamingConventionJS
function EditorApp() {
    const router = useRouter();
    // const [ paperWidthHeight/*, setPaperWidthHeight */ ] = useState({ width: "800px", height: "1131px" });
    // const [ menuData, setMenuData ] = useState();
    //const [ id, menuType, menuId, menuCategori ] = router.query.path;

    console.log(router);
    return (<ThemeProvider theme={theme}>
        <div className={`h-full h-screen`}>
            <CssBaseline/>
            <NextSeo
                title="Wevar Editor"
                description="A React framework for building drag-n-drop page editors."
                canonical="https://we.prim.dev/"
            />
            <Editor
                resolver={{
                    Button,
                    Container,
                    Custom1,
                    Custom2,
                    Custom2VideoDrop,
                    Custom3,
                    OnlyButtons,
                    Paper,
                    RestuMenuCategory,
                    RestuMenuItem,
                    Text,
                    RestuText,
                    Video

                }}
                enabled={false}
                onRender={RenderNode}>
                <Viewport>
                    <Frame>
                        <Paper key="root"/>
                    </Frame>
                </Viewport>
            </Editor>
        </div>
    </ThemeProvider>);
}

export default EditorApp;
