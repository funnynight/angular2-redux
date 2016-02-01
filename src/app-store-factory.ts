/** DRAFT **/
import {AppStore} from "./app-store";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import * as thunkMiddleware from "redux-thunk"

/**
 * Factory for app store
 */
const createAppStoreFactory = (reducers) => {
    const middlewareEnhancer = applyMiddleware(thunkMiddleware);
    /* tslint:disable */
    const isDebug = window && window.location.href.match(/[?&]debug=([^&]+)\b/) && window["devToolsExtension"];
    const applyDevTools = () => isDebug ? window["devToolsExtension"]() : f => f;
    /* tslint:enable */
    const enhancers = compose(middlewareEnhancer, applyDevTools());
    const createStoreWithEnhancers = enhancers(createStore);
    const reduxAppStore = createStoreWithEnhancers(reducers);
    // const reduxAppStore = createStore(reducers, undefined, enhancers); // new API (not typed yet)
    const appStore = new AppStore(reduxAppStore);
    return appStore;
};
/**
 * Create factory for a map of reducers (state pointing to reducers)
 */
const createAppStoreFactoryWithReducers = (reducersMap) => {
    return createAppStoreFactory(combineReducers(reducersMap));
};
/**
 * Create factory for a single reducer
 */
const createAppStoreFactoryWithReducer = (reducer) => {
  return createAppStoreFactory(reducer);
};

export {createAppStoreFactoryWithReducers,createAppStoreFactoryWithReducer}
