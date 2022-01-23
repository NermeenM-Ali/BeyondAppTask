import * as types from '../Types';

const initialState = {
    posts: [],
    pageLoading: true,
    pageError: false,
    pageRefresh: false,
    pagePaginate: false,
    moreData: true,
    pageIndex: 0,
}


const PostsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.FETCH_POSTS_STARTED:
            return { ...initialState }
        case types.FETCH_POSTS_SUCCESS:
            return {
                ...state, posts: (state.pageRefresh) ? action.payload : [...state.posts, ...action.payload],
                pageError: false, pageLoading: false, pageRefresh: false, pagePaginate: false,
                moreData: (state.posts.length + action.payload.length) >= action.records ? false : true
            }
        case types.FETCH_POSTS_FAILED:
            return { ...state, pageError: true, pageLoading: false, pageRefresh: false, pagePaginate: false }
        case types.FETCH_POSTS_REFRESH:
            return { ...state, pageRefresh: true, pageError: false, pageIndex: 1, pagePaginate: false, moreData: false }
        case types.FETCH_POSTS_PAGINATE:
            return { ...state, pagePaginate: true, pageIndex: state.pageIndex + 1}
        default:
            return state;
    }
}

export default PostsReducer;