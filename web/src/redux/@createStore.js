import {createStore} from 'redux';
import reducers from './store';

let store = undefined;

// 外部取得 store and dispatch , https://daveceddia.com/access-redux-store-outside-react/

// grab current state
// const state = store.getState();
export const getReduxState = () => store.getState();

// grab current dispatch
// const dispatch = store.dispatch;
export const getReduxDispatch = () => store.dispatch;

export default () => {

    //如果沒有用 middleware, 改用這個模式
    store = createStore(
        reducers, /* preLoadedState, */
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};
