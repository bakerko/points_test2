import {combineReducers} from "redux";
import {createStore,  applyMiddleware} from "redux";
import fileDataReducer from "./fileDataReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    api: fileDataReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))