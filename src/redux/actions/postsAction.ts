import { PostApiService } from '../../services/api/posts.service';
import * as types from '../Types';

export const fetchPostsList = () => {
    const postApi = new PostApiService()
    return async (dispatch: any, getState: any) => {
       const {pageIndex} = getState().PostsReducer
       postApi.Get(pageIndex).then((response)=>{
            dispatch({
                type: types.FETCH_POSTS_SUCCESS,
                payload: response.data,
                records: response.total
            })
        }).catch((err)=>{
            dispatch({type: types.FETCH_POSTS_FAILED})
        })
    }
}

export const getPostsList = () => {
    return (dispatch: any) => {
        dispatch({ type: types.FETCH_POSTS_STARTED })
        dispatch(fetchPostsList())
    }
}

export const refreshPostsList = () => {
    return (dispatch: any) => {
        dispatch({ type: types.FETCH_POSTS_REFRESH })
        dispatch(fetchPostsList())
    }
}

export const paginatePostsList = () => {
    return (dispatch: any) => {
        dispatch({ type: types.FETCH_POSTS_PAGINATE })
        dispatch(fetchPostsList())
    }
}

