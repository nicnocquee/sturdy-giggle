import { createReducer, createAction } from "redux-starter-kit";

const setUser = createAction("SET_USER");

const userReducer = createReducer(null, {
  [setUser]: (state, action) => {
    state = action.payload;
  }
});

export default userReducer;
