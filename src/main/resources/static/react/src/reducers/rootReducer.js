import {combineReducers} from 'redux';
import authSlice from "./authSlice.js";
import userSlice from "./userSlice.js";

const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
});

export default rootReducer;
