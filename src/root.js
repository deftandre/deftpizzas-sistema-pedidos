import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import {
    CssBaseline,
    createMuiTheme,
    MuiThemeProvider,
} from "@material-ui/core";
import { AuthProvider, OrderProvider } from "contexts";
import App from "./app";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        common: {
            white: "#f4f4f4",
            black: "#212121",
        },
        secondary: {
            main: "#ff5722",
        },
    },
});

const Root = () => (
    <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <OrderProvider>
                    <CssBaseline />
                    <GlobalStyle />
                    <BrowserRouter>
                        <Route component={App} />
                    </BrowserRouter>
                </OrderProvider>
            </AuthProvider>
        </ThemeProvider>
    </MuiThemeProvider>
);

const GlobalStyle = createGlobalStyle`
    #root{
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
`;

export default hot(module)(Root);
