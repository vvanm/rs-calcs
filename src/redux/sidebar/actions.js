import { createAction } from "redux-actions";

import * as types from "./types";

const toggle = createAction(types.TOGGLE);

export { toggle };
