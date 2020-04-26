import { createStore, applyMiddleware } from "redux";

import rootReducer from "./root-reducer";

import logger from "redux-logger";

const middlewares = [logger]; // Stores all the middelwares in an array.

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
