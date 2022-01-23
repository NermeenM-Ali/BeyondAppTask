import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import PostsReducer from "./reducers/postsReducer";

const RootReducer = combineReducers({
    PostsReducer:PostsReducer
})

export type RootState = ReturnType<typeof RootReducer>

const store = createStore(RootReducer, applyMiddleware(thunk))
export default store