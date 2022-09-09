import {
    STORE_USER,
    LOGOUT,
    STORE_BOARD,
    STORE_TEAM
} from '../constants';

const initialState = {
    profile: null,
    team: {},
    board: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USER:
            return { ...state, profile: action.data };
        case STORE_TEAM:
            return { ...state, team: action.data };
        case STORE_BOARD:
            return { ...state, board: action.data };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default userReducer;