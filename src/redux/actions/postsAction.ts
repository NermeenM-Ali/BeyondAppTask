import * as types from '../Types';

export const fetchPostsList = () => {
    return async (dispatch: any, getState: any) => {
       let {pageIndex} = getState().PostsReducer
        try{
            let response= await(await fetch(`https://dummyapi.io/data/v1/post?limit=10&page=${pageIndex}`, {
                method: 'GET',
                headers: {
                  'app-id': '61ec46ff4c83678c238aea9e',
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }
            })).json()
            if(response){
                dispatch({
                    type: types.FETCH_POSTS_SUCCESS,
                    payload: response.data,
                    records: response.total
                })
            }else{
                dispatch({type: types.FETCH_POSTS_FAILED})
            }
        }catch(err){
            dispatch({type: types.FETCH_POSTS_FAILED})
        }
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

