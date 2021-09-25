import { RenderNode }                 from "@/components/editor";
import { RestuEditor }                from "@/components/restaurants";
import { Button }                     from "@/components/selectors/Button";
import { createTheme, Grid }          from "@material-ui/core";
import { ThemeProvider }              from "@material-ui/styles";
import { NextSeo }                    from "next-seo";
import React                          from 'react';
import { SWRConfig }                  from "swr";
import Restaurant                     from "../components/restaurants/Elements/Restaurant";
import RestaurantsList                from "../components/restaurants/Elements/RestaurantsList";
import { Container, Text }            from "../components/selectors";
import fetcherMiddleware, { fetcher } from "../middleware/fetcher";

/**
 * A React Component that provides the Editor context
 */
declare type DefOpt = {
    id: number; url: URL; stringUrl?: (id?: number, url?: URL) => string; data: Promise<any>; endpoint: string; headers: Headers;
};
//let defOpt: defOpt;
let defOpt: DefOpt = {
    id:      null, url: new URL(process.env.API_URL + "/restaurants"), stringUrl: (id?: number, url?: URL) => {
        return (id || defOpt.id) > 0 && defOpt?.url ? `${url || defOpt?.url}/${id || defOpt?.id}${defOpt.endpoint}`
            : process.env.API_URL + defOpt.endpoint;
    }, data: null, endpoint: "/restaurants", headers: new Headers({
        "Content-Type":              "application/json",
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        "X-Restu-Api-Key":           process.env.API_KEY,
        "Upgrade-Insecure-Requests": "1",
    }),
};
const theme = createTheme({
    typography: {
        fontFamily: [ "acumin-pro", "Roboto", '"Helvetica Neue"', "Arial", "sans-serif" ].join(","),
    }, palette: {
        type: "dark"
    },
});

export let props: { fallback: {} };

const MyApp = () => {
    return (<ThemeProvider theme={theme}>
        <RestuEditor
            resolver={{
                Container, Text, Button, RestaurantsList, Restaurant
            }}
            enabled={true}
            onRender={RenderNode}>
            <SWRConfig value={{
                use: [ fetcherMiddleware ], fetcher: fetcher
            }}>
                <Grid className="h-full h-screen p-1">
                    <NextSeo
                        title="Wevar Editor"
                        description="A React framework for building drag-n-drop page editors."
                        canonical="https://editor.prim.dev/"
                    />
                    <RestaurantsList/>
                </Grid>
            </SWRConfig>
        </RestuEditor>
    </ThemeProvider>);
};

export default MyApp;
