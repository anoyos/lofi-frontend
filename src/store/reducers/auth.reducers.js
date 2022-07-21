import { AUTH_LOGOUT, AUTH_SUCCESS } from "../actions/types";

const auth = {
    user: null,
    web3: {}
}
export default function Auth(state = auth, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { 
                ...state, 
                user: action.payload.user,
                web3: action.payload.web3,
            };
        case AUTH_LOGOUT:
            return { 
                ...state, 
                user: null,
                web3: {}
            };
        default:
            return { ...state };
    }
}