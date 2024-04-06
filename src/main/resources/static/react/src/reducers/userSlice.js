import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    administrator: null,
    doctor: null,
    customer: null,
    role: null,
    loading: false,
    isAppointmentsLoading: true,
    isModalLoaded: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCustomer: (state, action) => {
            state.customer = action.payload;
        },
        setDoctor: (state, action) => {
            state.doctor = action.payload;
        },
        setAdministrator: (state, action) => {
            state.administrator = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setCustomerPets: (state, action) => {
            state.customer.customerPets = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCustomerVisit: (state, action) => {
            state.customer.customerVisit = action.payload;
        },
        setAppointmentsLoading: (state, action) => {
            state.isAppointmentsLoading = action.payload;
        },
        setIsModalLoaded: (state, action) => {
            state.isModalLoaded = action.payload;
        }
    }
});

export const {
    setCustomer,
    setDoctor,
    setAdministrator,
    setRole,
    setLoading,
    setCustomerPets,
    setCustomerVisit,
    setAppointmentsLoading,
    setIsModalLoaded,
} = userSlice.actions;
export default userSlice.reducer;
