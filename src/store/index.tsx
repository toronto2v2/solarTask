import { configureStore } from '@reduxjs/toolkit';
import panels from '../components/productsSection/productsSectionSlice';
import modal from '../components/orderModal/OrderModalSlice';
import court from '../components/basket/BasketSlice';

const store = configureStore({
    reducer: {panels,modal,court},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !=='production',
})

export default store;

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>