import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { withContexts } from "@storybook/addon-contexts/react";
import { contexts } from "./configs/contexts";
import withRouterContextProviderDecorator from "./router-context-provider";

addDecorator(withContexts(contexts));
addDecorator(withRouterContextProviderDecorator);

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
