import { createStore, combineReducers } from 'redux'
import { moviesReducer } from './redux/movies/reducer';

const store = createStore(combineReducers({
    movies: moviesReducer,
}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


export function createActionDispatcher(actionName) {
    return function (payload) {
        store.dispatch({
            type: actionName,
            payload
        })
    }
}

export default store