import {
    TOGGLE_LOADING,
    LOGOUT
} from '../constants';

const initialState = {
    loading: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return { ...state, loading: action.data };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default appReducer;