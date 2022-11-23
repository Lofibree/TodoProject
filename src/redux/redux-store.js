import  { applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import todoReducer from './todoReducer'
import thunkMiddleware from 'redux-thunk'

let reducers = combineReducers({
    todoPage: todoReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;