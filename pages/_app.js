import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/components/theme";
import withReduxStore from "../src/lib/with-redux-store";

const publicPages = ["/login"];

class MyApp extends App {
  static async getInitialProps({ router, ctx: { req, res } }) {
    if (req) {
      if (publicPages.indexOf(router.pathname) === -1) {
        const { parse: cookieParser } = eval("require('cookie')");
        const { cookie } = req.headers;
        if (!cookie) {
          res.writeHead(302, {
            Location: `/login?redirect=${req.url}`
          });
          res.end();
          return;
        }
        if (cookie) {
          const cookies = cookieParser(cookie);
          const { _token } = cookies;
          if (!_token) {
            res.writeHead(302, {
              Location: `/login?redirect=${req.url}`
            });
            res.end();
          }
        }
      }
    }

    return {};
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <Provider store={reduxStore}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
