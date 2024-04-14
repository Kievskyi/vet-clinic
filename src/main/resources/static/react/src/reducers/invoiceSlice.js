import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    id: null,
    isLoading: false,
};

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setInvoiceId: (state, action) => {
            state.id = action.payload;
        },
        setIsLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
});

export const {setInvoiceId, setIsLoading} = invoiceSlice.actions;
export default invoiceSlice.reducer;
