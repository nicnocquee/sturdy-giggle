import { configureStore } from "redux-starter-kit";
import userReducer from "./reducers/user";
import foodReducer from "./reducers/food";

export const initializeStore = preloadedState => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      food: foodReducer
    },
    preloadedState
  });

  return store;
};
