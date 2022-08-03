import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    products: [],
    selectedProducts: [],
    pageIndex: 0,
    productsPerPage: 5,
    productsTotal: 0,
  },
  reducers: {
    setProductsTotal: (state, action) => {
      state.productsTotal = action.payload;
    },

    resetPageIndex: state => {
      state.pageIndex = 0;
    },

    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },

    setProducts: (state, action) => {
      state.products = action.payload;
    },

    addProductToBasket: (state, action) => {
      state.selectedProducts.push(action.payload);
    },

    removeProductFromBasket: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(product => product.id !== action.payload.id);
    },
  },
});

export const { addProductToBasket, removeProductFromBasket, setProducts, setProductsTotal, setPageIndex } = generalSlice.actions;
export default generalSlice.reducer;
