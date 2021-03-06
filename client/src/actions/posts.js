import * as api from '../api';
import { FETCH_ALL, CREATE, DELETE, UPDATE, LIKE, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING} from '../constants/actionTypes';

export const getPost = (id) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING})
        const { data } = await api.fetchPost(id);
        dispatch({type: FETCH_POST, payload: data});
        dispatch({type: END_LOADING})
    }catch (error){
        console.log(error);
    }
}

// Action Creators
export const getPosts = (page) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING})
        const { data } = await api.fetchPosts(page?.page);
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING})
    }catch (error){
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING})
        const { data } = await api.fetchPostsBySearch(searchQuery);
        console.log("Search result: " , data)
        dispatch({type: FETCH_BY_SEARCH, payload: data});
        dispatch({type: END_LOADING})
    }catch (error){
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try{
        const { data } = await api.createPost(post);

        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try{
        const { data } = await api.updatePost(id, post)
        
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id})
    }catch(error){
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem('profile'));
        
        console.log(id, "---------", user?.token)

        const { data } = await api.likePost(id,user?.token)
        
        dispatch({type: LIKE, payload: data})
    } catch (error) {
        console.log(error)
    }
}
