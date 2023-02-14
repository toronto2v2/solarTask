import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const basketAdapter = createEntityAdapter();

const initialState = basketAdapter.getInitialState({
    showFinalSubmitForm: false,
})


const basketSlice = createSlice({
    name: 'court',
    initialState,
    reducers:{
        addNewPurchase: (state, action):any => {basketAdapter.upsertOne(state, action.payload)}
    },
});


const {actions,reducer} = basketSlice;

export default reducer;

export const {selectAll} = basketAdapter.getSelectors((state:any) => state.court);

export const {
    addNewPurchase
}= actions;
