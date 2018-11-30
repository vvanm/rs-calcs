import produce from "immer";

import * as types from "./types";

const initialState = {
  entries: []
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case types.SEARCH_OK:
      draft.entries = action.payload.results;
      return;
    default:
      return;
  }
}, initialState);

export default reducer;
