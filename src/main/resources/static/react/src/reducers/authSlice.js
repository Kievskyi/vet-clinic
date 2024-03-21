import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    userId: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            if (action.payload.token && action.payload.userId) {
                state.token = action.payload.token;
                state.userId = action.payload.userId;
            } else if (action.payload.token && !action.payload.userId) {
                state.token = action.payload.token;
            } else {
                state.userId = action.payload.userId;
            }
        },
        logout: (state) => {
            state.token = null;
            state.userId = null;
        },
    },
});

export const { setAuthData, logout } = authSlice.actions;
export default authSlice.reducer;
