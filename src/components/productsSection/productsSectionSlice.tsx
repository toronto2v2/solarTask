import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const panelAdapter = createEntityAdapter();
const initialState = panelAdapter.getInitialState({
    panelLoadingStatus: 'idle',
});


export const fetchPanels:any = createAsyncThunk(
    'panels/fetchPanels',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/panels");
    }
);

const panelsSlice = createSlice({
    name: 'panels',
    initialState,
    reducers:{
        quantityUpdated: (state, {payload}) => {
            const {id, ...changes} = payload;
            panelAdapter.updateOne(state, {id, changes})
        }, 
    },
    extraReducers:(buider) => {
        buider
            .addCase(fetchPanels.pending, state => {state.panelLoadingStatus = 'loading'})
            .addCase(fetchPanels.fulfilled, (state,action) => {state.panelLoadingStatus = 'idle';
                    panelAdapter.setAll(state, action.payload);})
            .addCase(fetchPanels.rejected, state => {state.panelLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {actions,reducer} = panelsSlice;

export default reducer;

export const {selectAll, selectById} = panelAdapter.getSelectors((state:any) => state.panels)

export const {
    quantityUpdated
} = actions;