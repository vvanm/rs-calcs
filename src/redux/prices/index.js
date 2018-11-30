import { combineReducers } from "redux";
import produce from "immer";

import runes from "./runes";

import * as types from "./types";
import * as actions from "./actions";
import * as thunks from "./thunks";

export { thunks, actions };

const wrapWithGeActions = (reducer, category) =>
  produce((draft, action) => {
    if (action.payload !== undefined && category === action.payload.category) {
      switch (action.type) {
        case types.PRICES_GE_GET:
          draft.geIsLoading = true;
          draft.geIsLoaded = false;
          return;
        case types.PRICES_GE_SET:
          draft.types.forEach(type => {
            draft[type] = {
              ...draft[type],
              current: action.payload.prices[type],
              ge: action.payload.prices[type]
            };
          });
          return;
        default:
      }
    }
    return reducer(draft, action);
  });

export default combineReducers({
  runes: wrapWithGeActions(runes, "runes")
});
