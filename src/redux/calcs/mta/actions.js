import { createAction } from "redux-actions";

import * as TYPES from "./types";

const reset = createAction(TYPES.RESET);
const updateConf = createAction(TYPES.UPDATE_CONF, (name, value) => ({
  name,
  value
}));
const toggleItem = createAction(TYPES.TOGGLE_ITEM, i => ({ i }));
const toggleAllItems = createAction(TYPES.TOGGLE_ALL_ITEMS);
const selectWands = createAction(TYPES.SELECT_WANDS);

export { reset, updateConf, toggleItem, toggleAllItems, selectWands };
