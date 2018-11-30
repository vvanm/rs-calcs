import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import createHistory from "history/createBrowserHistory";

import { persistStore } from "redux-persist";

import configureStore from "./redux/configure-store";

const history = createHistory();
const middlewares = [routerMiddleware(history), thunk];

const store = configureStore(history, middlewares);

const persistor = persistStore(store);

export { history, store, persistor };
