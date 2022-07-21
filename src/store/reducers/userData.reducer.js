import { GET_USER_DATA_SUCCESS, GET_USER_DATA_FAIL } from "../actions/types";

const initialState = {
    userData: {}
};

export default function UserData(state = initialState, action) { 
    switch (action.type) {
        case GET_USER_DATA_SUCCESS:
            return { 
                ...state, 
                userData: action.payload
            };
        case GET_USER_DATA_FAIL:
            return { 
                ...state,
                userData: action.payload
            };
        default:
            return { ...state };
    }
}