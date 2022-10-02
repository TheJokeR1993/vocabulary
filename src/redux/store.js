import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk'
import { lfWords } from "../localForage/localForage";
import reducerWords from "./wordsReducer/reducerWords";


const allReducers = combineReducers({
    words : reducerWords
})

const store = createStore(allReducers,applyMiddleware(thunkMiddleware))
store.subscribe(() => lfWords.setItem(store.getState().words))
 
export default store