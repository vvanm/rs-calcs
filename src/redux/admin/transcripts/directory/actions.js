import { createAction } from "redux-actions";

import * as types from "./types";

const searchOk = createAction(types.SEARCH_OK, results => ({ results }));

export { searchOk };
