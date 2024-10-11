import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count : 0
}

const cartSlice = createSlice({
    name :'cartCount',
    initialState,
    reducers:{
        increment : (state) =>{
            state.count += 1
        },
        decrement : (state) =>{
            state.count -= 1
        },
        setCount:(state,action)=>{
            state.count = action.payload
        }
    }
})

export const {setCount} = cartSlice.actions;
export default cartSlice.reducer;