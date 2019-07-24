import { configureStore } from "redux-starter-kit";
import userReducer from "./reducers/user";

export const initializeStore = preloadedState => {
  const store = configureStore({
    reducer: {
      user: userReducer
    },
    preloadedState
  });

  return store;
};
