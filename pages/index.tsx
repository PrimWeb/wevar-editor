// noinspection CheckTagEmptyBody

import { Element, Frame }            from "@craftjs/core";
import { createTheme }               from "@material-ui/core";
import { ThemeProvider }             from "@material-ui/styles";
import { NextSeo }                   from "next-seo";
import useSWR, { SWRConfig }         from "swr";
import { Container, Text }           from "../components/selectors";
import fetcherMiddleware             from "../middleware/fetcher";
import React                         from 'react';
import { Options }                   from '@craftjs/core/lib/interfaces';
import { Custom1, OnlyButtons }      from "../components/selectors/Custom1";
import { Custom2, Custom2VideoDrop } from "../components/selectors/Custom2";
import { Custom3 }                   from "../components/selectors/Custom3";
import { Button }                    from "../components/selectors/Button";
import { Editor, RenderNode }        from "../components/editor";
import RestaurantsList               from "../components/restaurants/Elements/restaurantsList";

/**
 * A React Component that provides the Editor context
 */
let url: URL = new URL(process.env.API_URL);
declare type DefOpt = {
    id: number;
    url: URL;
    stringUrl?: (id?: number, url?: URL) => string;
    data: Promise<any>;
    endpoint: string;
    headers: Headers;
};
//let defOpt: defOpt;
let defOpt: DefOpt = {
    id: null,
    url: new URL(process.env.API_URL),
    stringUrl: (id?: number, url?: URL) => {
        return (id || defOpt.id) > 0 && defOpt?.url
            ? `${url || defOpt?.url}/${id || defOpt?.id}${defOpt.endpoint}`
            : null;
    },
    data: null,
    endpoint: "",
    headers: new Headers({
        "Content-Type": "application/json",
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        "X-Restu-Api-Key": process.env.API_KEY,
        "Upgrade-Insecure-Requests": "1",
        // 'Access-Control-Allow-Origin': '*',
    }),
};
if (process.env.NODE_ENV === "development") {
    defOpt.id = 23030;
    defOpt.endpoint = "/daily_menus";
}
const theme = createTheme({
    typography: {
        fontFamily: [
            "acumin-pro",
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
        ].join(","),
    },
    palette: {
        type: "dark"
    },
});

export const API = defOpt.stringUrl();
export let props: { fallback: {} };
export declare const RestuEditor: React.FC<Partial<Options>>;
//
// export async function getServerSideProps() {
//     const repoInfo = await fetcher(API);
//     console.log("repoInfo", repoInfo, "repoInfo");
//     return {
//         props: {
//             fallback: {
//                 [API]: repoInfo,
//             },
//         },
//     };
// }

const Date = (props) => <Custom3 {...props} />;

const Restaurants = (props) => {
    const {data, error, isValidating} = useSWR(API);
    // there should be no `undefined` state
    console.log("Is data ready?", !!data, isValidating, error);
    if (error) {
        return <Date {...props} text="Chyba ..."/>;
    }
    if (!(data instanceof Array)) {
        return <Date {...props} text="Loading ..."/>;
    }
    console.log(data, isValidating);
    return (
        <Element
            canvas
            is={Container}
            id="days_element"
            width="100%"
            height="100%"
            padding={["0", "0", "0", "0"]}
            custom={{displayName: "Dayli Menus"}}>
            {data.map((day) => (
                <Element
                    canvas
                    is={Container}
                    id="day_element"
                    width="100%"
                    height="100%"
                    padding={["0", "0", "0", "0"]}
                    custom={{displayName: "Day - " + day.date}}>
                    <Text {...props} canvas is="p" text={day.date} custom={{displayName: "Datum"}}/>
                    <Element
                        canvas
                        is={Container}
                        width="100%"
                        height="auto"
                        key={day.date.toString()}
                        padding={["0", "0", "0", "0"]}
                        margin={["0", "0", "0", "0"]}
                        custom={{displayName: "Položky"}}>
                        {day.items.map((item) => (
                            <Text margin={["0", "0", "1rem", "0"]} text={item.name}></Text>
                        ))}
                    </Element>
                </Element>
            ))}
        </Element>
    );
};

const App = ({fallback}) => {
    console.log("App", fallback, "App");
    return (
        <SWRConfig value={{fallback, use: [fetcherMiddleware]}}>
            <ThemeProvider theme={theme}>
                <Editor
                    resolver={
                        {
                            Container,
                            Text,
                            Custom1,
                            Custom2,
                            Custom2VideoDrop,
                            Custom3,
                            OnlyButtons,
                            Button
                        }
                    }
                    enabled={false}
                    onRender={RenderNode}>
                    <div className="h-full h-screen">
                        <NextSeo
                            title="Wevar Editor"
                            description="A React framework for building drag-n-drop page editors."
                            canonical="https://editor.prim.dev/"
                        />
                        <Frame>
                            <RestaurantsList
                                {...props}
                                canvas
                                is={Container}
                                width="800px"
                                height="auto"
                                background={{r: 255, g: 255, b: 255, a: 0.7}}
                                padding={["40", "40", "40", "40"]}
                                custom={{displayName: "App"}}
                            />
                        </Frame>
                    </div>
                </Editor>
            </ThemeProvider>
        </SWRConfig>
    );
};

export default App;
