import { createAction } from "redux-actions";

import * as TYPES from "./types";

const setGePricesForCategory = createAction(TYPES.PRICES_GE_SET, (category, prices) => ({ category, prices }));

export { setGePricesForCategory };
