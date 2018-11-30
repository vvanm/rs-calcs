import { handleActions } from "redux-actions";

import * as types from "./types";

export default handleActions(
  {
    [types.TOGGLE]: state => !state
  },
  false
);
