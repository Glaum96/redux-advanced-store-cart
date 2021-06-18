import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false,
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
            if(!existItem){
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price*1,
                    name: newItem.title
                });
            }
            else{
                existItem.quantity++;
                existItem.totalPrice += newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.changed = true;

            if(existItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id); //HAAKON HER 2:00
                
            }
            else{
                existItem.quantity--;
                existItem.totalPrice = existItem.price * existItem.quantity;
            }
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;