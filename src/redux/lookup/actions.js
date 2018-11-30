import { createAction } from "redux-actions";

import * as types from "./types";

const lookupRsnOk = createAction(types.LOOKUP_RSN_OK, data => ({ ...data }));

export { lookupRsnOk };
