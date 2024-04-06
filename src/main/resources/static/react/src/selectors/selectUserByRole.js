import { createSelector } from '@reduxjs/toolkit';

export const selectRole = (state) => state.user.role;
export const selectLoading = (state) => state.user.loading;
export const selectCustomer = (state) => state.user.customer;
export const selectDoctor = (state) => state.user.doctor;
export const selectAdministrator = (state) => state.user.administrator;

// Комбинированный селектор для выбора данных пользователя по роли
export const selectUserDataByRole = createSelector(
    [selectRole, selectCustomer, selectDoctor, selectAdministrator],
    (role, customer, doctor, administrator) => {
        switch (role) {
            case 'CUSTOMER':
                return customer;
            case 'DOCTOR':
                return doctor;
            case 'ADMINISTRATOR':
                return administrator;
            default:
                return null;
        }
    }
);

export const selectIsLoading = createSelector([selectLoading], (loading) => loading);
