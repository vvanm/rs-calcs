import { combineReducers, createStore, applyMiddleware } from "redux";
import { connectRouter } from "connected-react-router";

import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistReducer } from "redux-persist";
import { setAutoFreeze } from "immer";

import sidebar from "./sidebar";
import ironman from "./ironman";
import user from "./user";
import prices from "./prices";
import lookup from "./lookup";
import calcs from "./calcs";
import admin from "./admin";
import transcripts from "./transcripts";

//immer and redux-persist dont like eachother
setAutoFreeze(false);

export default function configureStore(history, middlewares) {
  return createStore(
    persistReducer(
      {
        key: "root",
        storage,
        whitelist: ["sidebar", "ironman"]
      },
      combineReducers({
        router: connectRouter(history),
        sidebar,
        ironman,
        user,
        admin,
        transcripts,
        prices,
        lookup: persistReducer(
          {
            key: "lookup",
            storage,
            whitelist: ["rsn"]
          },
          lookup
        ),
        calcs
      })
    ),
    composeWithDevTools(applyMiddleware(...middlewares))
  );
}
