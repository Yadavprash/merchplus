import { Product } from '@/components/types/productType';
import { createSlice ,PayloadAction} from '@reduxjs/toolkit';


interface ProductsState {
    products: Product[];
  }

const initialState:ProductsState = {
    products : []
}

const productsSlice = createSlice({
    name :'products',
    initialState,
    reducers:{
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
          },
          addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
          },
          clearProducts: (state) => {
            state.products = [];
          },
    }
})

export const { setProducts, addProduct, clearProducts } = productsSlice.actions;

export default productsSlice.reducer;