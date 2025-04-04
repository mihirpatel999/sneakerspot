import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { cartItem: [], total: 0 },
    reducers: {
        addtocart(state, action) {
            const existingItem = state.cartItem.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                existingItem.qty += 1; 
                toast.info(`${action.payload.name} quantity increased`);
            } else {
                state.cartItem.push({ ...action.payload, qty: 1 }); 
                toast.success(`${action.payload.name} added to cart`);
            }
            state.total = state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0);
        },
        increase(state, action) {
            const item = state.cartItem.find(item => item.id === action.payload.id);
            if (item) item.qty += 1;
            state.total = state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0);
        },
        decrease(state, action) {
            const item = state.cartItem.find(item => item.id === action.payload.id);
            if (item && item.qty > 1) {
                item.qty -= 1;
            } else {
                state.cartItem = state.cartItem.filter(item => item.id !== action.payload.id);
            }
            state.total = state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0);
        },
        removefromcart(state, action) {
            state.cartItem = state.cartItem.filter(item => item.id !== action.payload.id);
            state.total = state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0);
        },
        emptycart(state) {
            state.cartItem = [];
            state.total = 0;
        }
    }
});

export const { addtocart, increase, decrease, removefromcart, emptycart } = cartSlice.actions;
export default cartSlice;

export const selectcart = state => state.cart.cartItem;
export const selectTotal = state => state.cart.total;
