import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers"; //Import the reducer
import promise from "redux-promise-middleware";
import { createLogger } from "redux-logger";

const loggerMiddleWare = createLogger({
  predicate: (getState, action) => true,
});
const middleWares = applyMiddleware(promise, thunk, loggerMiddleWare);

export default createStore(reducers, middleWares);
