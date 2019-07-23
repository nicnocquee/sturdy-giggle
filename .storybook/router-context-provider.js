import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";

class RouterContextProvider extends React.Component {
  static childContextTypes = {
    router: PropTypes.object
  };
  getChildContext() {
    return {
      router: {
        pathname: "/"
      }
    };
  }
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default function withRouterContextProviderDecorator(storyFn) {
  return (
    <RouterContextProvider>
      <CssBaseline />
      {storyFn()}
    </RouterContextProvider>
  );
}
