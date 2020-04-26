/*
Combines all the reducers into a single reducer
Handles the state for the entire application
The keys in combineReducers represent the individual reducers
combineReducers will combine each reducer into a single object
*/

import { combineReducers } from "redux";

import barcodeToolbarReducer from "./barcode-toolbar/barcode-toolbar.reducer";

const rootReduer = combineReducers({
  barcodeToolbar: barcodeToolbarReducer,
});
