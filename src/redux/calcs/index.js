import { combineReducers } from "redux";

import mta from "./mta";
import construction from "./construction";

export default combineReducers({
  mta,
  construction
});
