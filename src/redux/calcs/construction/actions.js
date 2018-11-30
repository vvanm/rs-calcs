import { createAction } from "redux-actions";

import * as TYPES from "./types";

const updateConf = createAction(TYPES.UPDATE_CONF, (name, value) => ({
  name,
  value
}));

export { updateConf };
