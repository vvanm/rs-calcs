import { createAction } from "redux-actions";

import * as TYPES from "./types";

const onTabChange = createAction(TYPES.ON_TAB_CHANGE);
const updateBuyX = createAction(TYPES.UPDATE_BUY_X, (id, buyX) => ({
  id,
  buyX
}));
const updateBuyShop = createAction(TYPES.UPDATE_BUY_SHOP, (id, shop) => ({
  id,
  shop
}));
const setBuyPrice = createAction(TYPES.SET_BUY_PRICE, (id, price) => ({
  id,
  price
}));
const updateBuyRunesNeeded = createAction(TYPES.UPDATE_BUY_RUNES_NEEDED, (id, amount) => ({
  id,
  amount
}));

export { onTabChange, updateBuyX, updateBuyShop, updateBuyRunesNeeded, setBuyPrice };
