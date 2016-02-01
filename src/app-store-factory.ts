import {AppStore} from "./app-store";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import * as thunkMiddleware from "redux-thunk"

/**
 * Factory for app store
 */
export function createAppStoreFactory(reducers) {
    return () => {

        /* tslint:disable */
        const isDebug = window && window.location.href.match(/[?&]debug=([^&]+)\b/) && window["devToolsExtension"];
        const applyDevTools = () => isDebug ? window["devToolsExtension"]() : f => f;
        /* tslint:enable */

        const middlewareEnhancer = applyMiddleware(thunkMiddleware);
        const enhancers = compose(middlewareEnhancer, applyDevTools());
        const createStoreWithEnhancers = enhancers(createStore);

        if (typeof reducers === "object") {
            // it's not a single reducer so we need to combine the reducers on the object properties
            reducers = combineReducers(reducers);
        }

        const reduxAppStore = createStoreWithEnhancers(reducers);
        // const reduxAppStore = createStore(reducers, undefined, enhancers); // new API (not typed yet)

        return new AppStore(reduxAppStore);

    }
};
