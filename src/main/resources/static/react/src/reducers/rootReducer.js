import {combineReducers} from 'redux';
import authSlice from "./authSlice.js";
import userSlice from "./userSlice.js";
import invoiceSlice from "./invoiceSlice.js";

const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
    invoice: invoiceSlice,
});

export default rootReducer;
