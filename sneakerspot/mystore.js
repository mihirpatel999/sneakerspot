    import { configureStore } from "@reduxjs/toolkit";
    import productSlice from "./productSlice";

    import cartSlice from "./cartSlice";

    import checkoutSlice from "./checkoutSlice";
    import orderSlice from "./orderSlice";
import rentalProductSlice from "./rentalProductSlice";
import rentalCartSlice from "./rentalCartSlice";


    const mystore = configureStore({
        reducer: {
            product: productSlice.reducer,
            rentalCart: rentalCartSlice.reducer,
            cart: cartSlice.reducer,
            checkout:checkoutSlice.reducer,
            rentalProduct:rentalProductSlice.reducer,
            rentalCart:rentalCartSlice.reducer,
            order:orderSlice.reducer

        }
    });

    export default mystore;
