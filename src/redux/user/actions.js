import { createAction } from "redux-actions";

import * as TYPES from "./types";

export const loginOk = createAction(TYPES.LOGIN_OK);
export const registerOk = createAction(TYPES.REGISTER_OK);
export const authOk = createAction(TYPES.AUTH_OK);
export const logoutOk = createAction(TYPES.LOGOUT_OK);
