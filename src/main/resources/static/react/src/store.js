import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    // Это позволит вам указать, какие редьюсеры хотите сохранять
    whitelist: ['auth', 'customer'] // Или blacklist для тех, что не хотите сохранять
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // другие настройки если нужны
});

export const persistor = persistStore(store);
