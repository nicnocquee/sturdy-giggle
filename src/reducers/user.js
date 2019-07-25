import { createReducer, createAction } from "redux-starter-kit";

export const setUser = createAction("SET_USER");

const userReducer = createReducer(null, {
  [setUser]: (state, action) => {
    state = action.payload;
    return state;
  }
});

export default userReducer;
