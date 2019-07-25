import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/components/theme";
import withReduxStore from "../src/lib/with-redux-store";
import { auth } from "../src/lib/auth";
import { setUser } from "../src/reducers/user";

class MyApp extends App {
  static async getInitialProps({ router, Component, ctx }) {
    let pageProps = {};

    const { req, res, reduxStore } = ctx;
    const user = auth({ req, res, router });

    if (user) {
      reduxStore.dispatch(setUser(user));
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx, router });
    }

    return { user, pageProps };
  }

  componentDidMount() {
    // material-ui: Remove the server-side injected CSS.
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
