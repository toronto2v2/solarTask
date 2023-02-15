import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggleModal: false,
    id: null,
    orderName: '',
    orderQuantity: 0,
    totalCost: 0,
    available: 0,
    price: 0
}

const OrderModalSlice = createSlice ({
    name: 'modal',
    initialState,
    reducers: {
        toggleModal: (state) => {state.toggleModal = !state.toggleModal},
        panelData: (state, action) => {state.id = action.payload.id;
                                    state.orderName = action.payload.orderName;
                                    state.orderQuantity = action.payload.orderQuantity;
                                    state.totalCost = action.payload.totalCost;
                                    state.available = action.payload.available;
                                    state.price = action.payload.price},
    },

})

const {actions, reducer} = OrderModalSlice;

export default reducer;

export const {
    toggleModal,
    panelData
} = actions;

