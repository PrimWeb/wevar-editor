// noinspection CheckTagEmptyBody

import { Editor, Frame, Element } from "@craftjs/core";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { NextSeo } from "next-seo";
import useSWR, { SWRConfig } from "swr";

import { Viewport, RenderNode } from "../components/editor";
import { Container, Text } from "../components/selectors";
import { Button } from "../components/selectors/Button";
import { Custom1, OnlyButtons } from "../components/selectors/Custom1";
import { Custom2, Custom2VideoDrop } from "../components/selectors/Custom2";
import { Custom3 } from "../components/selectors/Custom3";
import { Video } from "../components/selectors/Video";
import fetcher from "../middleware/fetcher";

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
  url: new URL("https://rest-api.restu.cz/v1/restaurants"),
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
});

export const API = defOpt.stringUrl();
export let props: { fallback: {} };
export async function getServerSideProps() {
  const repoInfo = await fetcher(API);
  console.log("repoInfo", repoInfo, "repoInfo");
  return {
    props: {
      fallback: {
        [API]: repoInfo,
      },
    },
  };
}

const Data = (props) => <Custom3 {...props} />;
const Restaurants = (props) => {
  const { data, error, isValidating } = useSWR(API);
  //data = data || props[API] || null;
  // there should be no `undefined` state
  console.log("Is data ready?", !!data, isValidating, error);
  if (error) return <Data {...{ ...props, ...{ text: "Chyba ..." } }} />;
  if (!(data instanceof Array))
    return <Data {...{ ...props, ...{ text: "Loading ..." } }} />;
  console.log(data, isValidating);
  return (
    <Element
      canvas
      is="ul"
      id="days_element"
      width="60%"
      height="100%"
      padding={["0", "20", "0", "20"]}
      custom={{ displayName: "Days" }}>
      {data.map((day) => (
        <Element
          canvas
          is="li"
          id="day_element"
          width="60%"
          height="100%"
          padding={["0", "20", "0", "20"]}
          custom={{ displayName: "Day - " + day.date }}>
          <Data {...{ ...props, ...{ data, text: day.date } }} />
          <Element
            canvas
            is={Container}
            width="100%"
            height="auto"
            key={day.date.toString()}
            padding={["0", "20", "0", "20"]}
            margin={["0", "0", "40", "0"]}
            custom={{ displayName: "Items" }}>
            {day.items.map((item) => (
              <Element
                canvas
                is={Container}
                width="100%"
                height="auto"
                padding={["0", "20", "0", "20"]}
                margin={["0", "0", "40", "0"]}
                custom={{ displayName: "Item" }}>
                <Text text={item.name}></Text>
              </Element>
            ))}
          </Element>
        </Element>
      ))}
    </Element>
  );
};
function App({ fallback }) {
  console.log("App", fallback, "App");
  return (
    <SWRConfig value={{ fallback }}>
      <ThemeProvider theme={theme}>
        <div className="h-full h-screen">
          <NextSeo
            title="Wevar Editor"
            description="A React framework for building drag-n-drop page editors."
            canonical="https://editor.prim.dev/"
          />
          <Editor
            {...props}
            resolver={{
              Container,
              Text,
              Custom1,
              Custom2,
              Custom2VideoDrop,
              Custom3,
              OnlyButtons,
              Button,
              Video,
              Restaurants,
              SWRConfig,
            }}
            enabled={false}
            onRender={RenderNode}>
            <Viewport>
              <Frame>
                <Element
                  {...props}
                  canvas
                  is={Container}
                  width="800px"
                  height="auto"
                  background={{ r: 255, g: 255, b: 255, a: 1 }}
                  padding={["40", "40", "40", "40"]}
                  custom={{ displayName: "App" }}>
                  <Restaurants
                    {...props}
                    {...fallback}
                    canvas
                    is={Container}
                    width="100%"
                    height="auto"
                    padding={["10", "10", "10", "10"]}
                    custom={{
                      displayName: "Restaurants",
                    }}
                  />
                </Element>
              </Frame>
            </Viewport>
          </Editor>
        </div>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;
