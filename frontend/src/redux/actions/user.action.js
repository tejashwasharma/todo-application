import useAxios from '../../api';
import { TOGGLE_LOADING, STORE_USER, STORE_BOARD, STORE_TEAM } from '../constants';

export const login = (credentials) => {
    return (dispatch) => {
        dispatch({ type: TOGGLE_LOADING, data: true });
        useAxios({
            method: 'post',
            url: '/auth/login',
            data: credentials
        })
            .then(res => {
                const data = res.data;
                localStorage.setItem("Auth_token", data.token);
                dispatch({ type: STORE_USER, data: data.user });
                dispatch({ type: STORE_TEAM, data: data.team });
                dispatch({ type: TOGGLE_LOADING, data: false });
            })
            .catch(error => {
                dispatch({ type: TOGGLE_LOADING, data: false });
            })
    }
}

export const signup = (user, callback) => {
    return (dispatch) => {
        dispatch({ type: TOGGLE_LOADING, data: true });
        useAxios({
            method: 'post',
            url: '/auth/signup',
            data: user
        })
            .then(res => {
                dispatch({ type: TOGGLE_LOADING, data: false });
                if (callback) callback();
            })
            .catch(error => {
                dispatch({ type: TOGGLE_LOADING, data: false });
            })
    }
}

export const getProjectBoard = () => {
    return (dispatch) => {
        dispatch({ type: TOGGLE_LOADING, data: true });
        useAxios({
            method: 'get',
            url: '/user/board'
        })
            .then(res => {
                dispatch({ type: STORE_BOARD, data: res.data.board });
                dispatch({ type: TOGGLE_LOADING, data: false });
            })
            .catch(error => {
                dispatch({ type: TOGGLE_LOADING, data: false });
            })
    }
}

export const createBoardItem = (data) => {
    return (dispatch) => {
        dispatch({ type: TOGGLE_LOADING, data: true });
        useAxios({
            method: 'post',
            url: '/user/board/item',
            data
        })
            .then(res => {
                dispatch({ type: STORE_BOARD, data: res.data.board });
                dispatch({ type: TOGGLE_LOADING, data: false });
            })
            .catch(error => {
                dispatch({ type: TOGGLE_LOADING, data: false });
            })
    }
}

export const updateBoardItem = (data) => {
    return (dispatch) => {
        dispatch({ type: TOGGLE_LOADING, data: true });
        useAxios({
            method: 'put',
            url: '/user/board/item',
            data
        })
            .then(res => {
                dispatch({ type: STORE_BOARD, data: res.data.board });
                dispatch({ type: TOGGLE_LOADING, data: false });
            })
            .catch(error => {
                dispatch({ type: TOGGLE_LOADING, data: false });
            })
    }
}
