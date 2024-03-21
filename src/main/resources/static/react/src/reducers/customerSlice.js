// features/customer/customerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customer: null,
    loading: true,
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomer: (state, action) => {
            state.customer = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setCustomer, setLoading } = customerSlice.actions;
export default customerSlice.reducer;
