import produce from "immer";

import * as types from "./types";

const initialState = {
  rsn: "",
  rsnIsLoading: false,
  rsnIsError: false,
  rsnIsLoaded: false,
  skills: {}
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case types.LOOKUP_RSN_OK:
      draft.rsnIsLoaded = true;
      draft.rsnIsLoading = false;
      draft.skills = action.payload.skills;
      return;
    default:
      return;
  }
}, initialState);

export default reducer;
