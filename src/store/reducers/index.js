import { combineReducers } from "redux";
// import { Upload } from "../../../../backend/db";
import Auth from "./auth.reducers";
import Uploading from "./upload.reducer";
import Biding from "./bid.reducer";
import UserCover from "./userCover.reducer";
import UserData from "./userData.reducer";

const reducers = combineReducers({
    auth: Auth,
    uploading: Uploading,
    biding: Biding,
    userCover: UserCover,
    userData: UserData
})

export default reducers;