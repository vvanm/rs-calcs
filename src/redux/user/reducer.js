import produce from "immer";

import * as TYPES from "./types";

const initialState = {
  isAuth: false,
  name: "",
  userType: ""
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case TYPES.LOGOUT_OK:
      return initialState;
    case TYPES.LOGIN_OK:
      return {
        ...draft,
        isAuth: true,
        ...action.payload
      };
    case TYPES.AUTH_OK:
      return {
        ...draft,
        isAuth: true,
        ...action.payload
      };
    default:
      return;
  }
}, initialState);

export default reducer;
