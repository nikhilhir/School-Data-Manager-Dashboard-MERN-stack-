import {legacy_createStore,combineReducers, applyMiddleware,compose} from "redux"
import { Loginreducer } from "./Login/actionreducer";
import { studentReducer } from "./Student/actionreducer";
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  Auth: Loginreducer,
  student:studentReducer,
});

export const store = legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))