import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rentalCart: [],
    total: 0,
    rent: false
};

const rentalCartSlice = createSlice({
    name: "rentalCart",
    initialState,
    reducers: {
        addToRentalCart: (state, action) => {
            const existingItem = state.rentalCart.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                state.rentalCart.push({ 
                    ...action.payload, 
                    duration: "daily", 
                    qty: 1 
                });
            }
            state.rent = true;
        },
        removeFromRentalCart: (state, action) => {
            state.rentalCart = state.rentalCart.filter(item => item.id !== action.payload.id);
            if (state.rentalCart.length === 0) {
                state.rent = false;
            }
        },
        emptyRentalCart: (state) => {
            state.rentalCart = [];
            state.rent = false;
        },
        increaseRentalQty: (state, action) => {
            const item = state.rentalCart.find(item => item.id === action.payload.id);
            if (item) item.qty += 1;
        },
        decreaseRentalQty: (state, action) => {
            const item = state.rentalCart.find(item => item.id === action.payload.id);
            if (item && item.qty > 1) {
                item.qty -= 1;
            } else {
                
                state.rentalCart = state.rentalCart.filter(cartItem => cartItem.id !== action.payload.id);
                if (state.rentalCart.length === 0) {
                    state.rent = false;
                }
            }
        },
        changeRental: (state, action) => {
            const item = state.rentalCart.find(item => item.id === action.payload.id);
            if (item) item.duration = action.payload.duration;
        },
         totalRent: (state, action) => {
            state.total = state.rentalCart.reduce((acc, item) => acc + item.price * item.qty, 0);
        }
    }
});


export const { 
    addToRentalCart, removeFromRentalCart, emptyRentalCart, increaseRentalQty,  decreaseRentalQty, changeRental ,totalRent} = rentalCartSlice.actions;

export default rentalCartSlice;
