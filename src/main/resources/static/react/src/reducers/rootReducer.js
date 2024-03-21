import {combineReducers} from 'redux';
import authSlice from "./authSlice.js";
import customerSlice from "./customerSlice.js";

const rootReducer = combineReducers({
    auth: authSlice,
    customer: customerSlice,
});

export default rootReducer;
