import { GET_USER_COVER_SUCCESS, GET_USER_COVER_FAIL } from "../actions/types";

const initialState = {
    userCover: {}
};

export default function UserCover(state = initialState, action) {
    switch (action.type) {
        case GET_USER_COVER_SUCCESS:
            return { 
                ...state, 
                userCover: action.payload
            };
        case GET_USER_COVER_FAIL:
            return { 
                ...state, 
                userCover: action.payload
            };
        default:
            return { ...state };
    }
}