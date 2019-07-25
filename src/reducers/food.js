import { createReducer, createAction } from "redux-starter-kit";

export const setFood = createAction("SET_FOOD");

const foodReducer = createReducer("", {
  [setFood]: (state, action) => {
    state = action.payload;
    return state;
  }
});

export default foodReducer;
