import { createTheme }   from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Openapi }       from 'components/openapi';
import { NextSeo }       from 'next-seo';
import React             from 'react';

const options = {
    url: "https://septimtet.prim.dev/openapi"
};

const theme = createTheme({
    typography: {
        fontFamily: [ 'acumin-pro', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', ].join(','),
    },
});

// noinspection FunctionNamingConventionJS
function App() {
    return (<ThemeProvider theme={theme}>
        <div className="h-full h-screen">
            <NextSeo
                title="Wevar Editor"
                description="A React framework for building drag-n-drop page editors."
                canonical="https://editor.prim.dev/"
            />
            <Openapi url={options.url}/>
        </div>
    </ThemeProvider>);
}

export default App;
