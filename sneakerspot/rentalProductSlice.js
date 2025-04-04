import { createSlice } from "@reduxjs/toolkit";

const rentalProductSlice = createSlice({
    name: "rentalProduct",
    initialState: { rentalProducts: [] },
    reducers: {
        store_rentalProducts(state, action) {
            state.rentalProducts = action.payload;
        }
    }
});

export const { store_rentalProducts } = rentalProductSlice.actions;
export default rentalProductSlice;
export const selectRentalProducts = state => state.rentalProduct.rentalProducts;
